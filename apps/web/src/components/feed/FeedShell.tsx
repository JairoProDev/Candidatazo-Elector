"use client";

import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import type { FeedCardModel } from "@/lib/feed/feedTypes";
import { generateFeedChunk } from "@/lib/feed/feedEngine";
import { useFeedStore } from "@/lib/feed/feedStore";
import { FeedCardView } from "./FeedCardView";
import { FeedFocusOverlay } from "./FeedFocusOverlay";
import { trackFeedEventDev } from "@/lib/analytics/feedAnalytics";
import type { FeedCardType } from "@/lib/feed/feedTypes";
import { FeedErrorBoundary } from "./FeedErrorBoundary";

const HEADER_HEIGHT = 64;

function getViewportHeight() {
  if (typeof window === "undefined") return 800;
  return Math.max(520, window.innerHeight - HEADER_HEIGHT);
}

function makeMatchSeed(weights: unknown) {
  if (!weights) return "default";
  // Keep stable but small: sum + top dim label.
  try {
    const obj = weights as Record<string, number>;
    const sum = Object.values(obj).reduce((acc, n) => acc + n, 0);
    const top = Object.entries(obj).sort((a, b) => b[1] - a[1])[0]?.[0] ?? "x";
    return `${top}:${Math.round(sum)}`;
  } catch {
    return "default";
  }
}

export function FeedShell() {
  const viewportH = useMemo(() => getViewportHeight(), []);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const isAppendingRef = useRef(false);

  const [cards, setCards] = useState<FeedCardModel[]>([]);
  const [offset, setOffset] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  const [focusCard, setFocusCard] = useState<FeedCardModel | null>(null);
  const weights = useFeedStore((s) => s.match.weights);
  const lastCardIndex = useFeedStore((s) => s.lastCardIndex);
  const addTimeOnCard = useFeedStore((s) => s.addTimeOnCard);
  const ctaClicksByCardId = useFeedStore((s) => s.ctaClicksByCardId);
  const timeMsByCardId = useFeedStore((s) => s.timeMsByCardId);

  const matchSeed = useMemo(() => makeMatchSeed(weights), [weights]);

  const chunkSize = 10;

  const interactionSignalsByType = useMemo(() => {
    const clicksByType: Partial<Record<FeedCardType, number>> = {};
    const timeMsByType: Partial<Record<FeedCardType, number>> = {};

    for (const [cardId, count] of Object.entries(ctaClicksByCardId)) {
      const parts = cardId.split("-");
      if (parts.length < 3) continue;
      const type = parts.slice(1, -1).join("-") as FeedCardType;
      clicksByType[type] = (clicksByType[type] ?? 0) + count;
    }

    for (const [cardId, ms] of Object.entries(timeMsByCardId)) {
      const parts = cardId.split("-");
      if (parts.length < 3) continue;
      const type = parts.slice(1, -1).join("-") as FeedCardType;
      timeMsByType[type] = (timeMsByType[type] ?? 0) + ms;
    }

    return { clicksByType, timeMsByType };
  }, [ctaClicksByCardId, timeMsByCardId]);

  const activeCardIdRef = useRef<string | null>(null);
  const activeCardTypeRef = useRef<FeedCardType>("match");
  const cardStartedAtRef = useRef<number>(Date.now());

  const appendChunk = useCallback(
    (nextOffset: number) => {
      if (isAppendingRef.current) return;
      isAppendingRef.current = true;
      const next = generateFeedChunk({
        offset: nextOffset,
        weights,
        matchSeed,
        chunkSize,
        interactionSignals: interactionSignalsByType,
      });
      setCards((prev) => [...prev, ...next]);
      setOffset(nextOffset + chunkSize);
      // Reset after state update flush; deterministic chunking doesn't need async loading.
      window.setTimeout(() => {
        isAppendingRef.current = false;
      }, 50);
    },
    [weights, matchSeed, interactionSignalsByType],
  );

  // Initial load
  useEffect(() => {
    setCards([]);
    setOffset(0);
    activeCardIdRef.current = null;
    activeCardTypeRef.current = "match";
    cardStartedAtRef.current = Date.now();
    appendChunk(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Infinite sentinel
  useEffect(() => {
    const root = containerRef.current;
    const sentinel = sentinelRef.current;
    if (!root || !sentinel) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (!first?.isIntersecting) return;
        appendChunk(offset);
      },
      { root, threshold: 0.2 },
    );

    obs.observe(sentinel);
    return () => obs.disconnect();
  }, [appendChunk, offset]);

  // Track active index on scroll (cards are full viewport height)
  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(() => {
        raf = 0;
        const idx = Math.round(root.scrollTop / viewportH);
        if (idx !== activeIndex) setActiveIndex(Math.max(0, idx));
        useFeedStore.getState().setLastCardIndex(Math.max(0, idx));
      });
    };
    root.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      root.removeEventListener("scroll", onScroll);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, [activeIndex, viewportH]);

  // timeOnCard
  useEffect(() => {
    const current = cards[activeIndex];
    if (!current) return;

    const prevId = activeCardIdRef.current;
    const prevType = activeCardTypeRef.current;
    const prevStartedAt = cardStartedAtRef.current;

    // On first activation, initialize refs without emitting.
    if (!prevId) {
      activeCardIdRef.current = current.id;
      activeCardTypeRef.current = current.type;
      cardStartedAtRef.current = Date.now();
      return;
    }

    if (prevId !== current.id) {
      const durationMs = Date.now() - prevStartedAt;
      addTimeOnCard(prevId, durationMs);
      trackFeedEventDev(
        {
          cardId: prevId,
          cardType: prevType,
          action: "time_on_card",
          meta: { durationMs },
        } as any,
        "feed_time_on_card",
      );

      activeCardIdRef.current = current.id;
      activeCardTypeRef.current = current.type;
      cardStartedAtRef.current = Date.now();
    }
  }, [activeIndex, cards]);

  // Resume scroll
  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;
    const idx = Math.max(0, lastCardIndex || 0);
    // Ensure content exists (MVP: if out of range, clamp)
    const clamped = Math.min(idx, Math.max(0, cards.length - 1));
    root.scrollTo({ top: clamped * viewportH, behavior: "auto" });
    setActiveIndex(clamped);
  }, [cards.length, lastCardIndex, viewportH]);

  const openFocus = (card: FeedCardModel) => {
    setFocusCard(card);
    trackFeedEventDev(
      { cardId: card.id, cardType: card.type, action: "interact_card", meta: { from: "focus" } } as any,
      "feed_interact_card",
    );
    trackFeedEventDev(
      { cardId: card.id, cardType: card.type, action: "overlay_open", meta: { from: "feed" } },
      "feed_overlay_open",
    );
  };

  const closeFocus = () => {
    const closed = focusCard;
    setFocusCard(null);
    trackFeedEventDev(
      { cardId: closed?.id ?? "", cardType: closed?.type ?? "match", action: "overlay_close", meta: {} } as any,
      "feed_overlay_close",
    );
    trackFeedEventDev(
      {
        cardId: closed?.id ?? "",
        cardType: closed?.type ?? "match",
        action: "back_to_feed",
        meta: {},
      } as any,
      "feed_back_to_feed",
    );
  };

  return (
    <FeedErrorBoundary>
      <div className="w-full">
        <div
          ref={containerRef}
          className="h-[calc(100vh-64px)] overflow-y-auto snap-y snap-mandatory overscroll-contain"
          style={{ height: `calc(100vh - ${HEADER_HEIGHT}px)` }}
          tabIndex={0}
          onKeyDown={(e) => {
            if (focusCard) return;
            const root = containerRef.current;
            if (!root) return;

            if (e.key === "ArrowDown" || e.key === "PageDown") {
              e.preventDefault();
              const next = Math.min(cards.length - 1, activeIndex + 1);
              root.scrollTo({ top: next * viewportH, behavior: "smooth" });
            }

            if (e.key === "ArrowUp" || e.key === "PageUp") {
              e.preventDefault();
              const prev = Math.max(0, activeIndex - 1);
              root.scrollTo({ top: prev * viewportH, behavior: "smooth" });
            }
          }}
        >
          <div className="relative">
            <div className="absolute top-3 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
              <div className="rounded-full bg-white/80 border border-gray-200 px-3 py-2 text-xs font-extrabold text-gray-700">
                {activeIndex + 1} / {cards.length || 1}
              </div>
            </div>

            {cards.map((card, idx) => (
              <div
                key={card.id}
                className="snap-start"
                style={{ height: viewportH }}
                aria-current={idx === activeIndex ? "true" : "false"}
              >
                <FeedCardView card={card} isActive={idx === activeIndex} onOpenFocus={openFocus} />
              </div>
            ))}

            <div ref={sentinelRef} />
          </div>
        </div>

        {focusCard && (
          <FeedFocusOverlay
            card={focusCard}
            previewKey={focusCard.preview.key}
            onClose={closeFocus}
          />
        )}
      </div>
    </FeedErrorBoundary>
  );
}

