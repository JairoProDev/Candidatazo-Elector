"use client";

import { useEffect } from "react";
import type { FeedCardModel } from "@/lib/feed/feedTypes";
import { FeedPreviewRenderer } from "./FeedPreviewRenderer";
import { useFeedStore } from "@/lib/feed/feedStore";
import ShareCard from "@/components/gamification/ShareCard";

export function FeedFocusOverlay({
  card,
  previewKey,
  onClose,
}: {
  card: FeedCardModel;
  previewKey: FeedCardModel["preview"]["key"];
  onClose: () => void;
}) {
  const topMatch = useFeedStore((s) => s.match.topMatch);
  useEffect(() => {
    // lock scroll
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[9999] bg-gray-950/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={`Focus overlay: ${card.title}`}
      onClick={onClose}
    >
      <div
        className="w-full max-w-3xl rounded-[2rem] border border-white/10 bg-white/95 shadow-[0_30px_120px_-60px_rgba(0,0,0,0.9)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-3 p-4 border-b border-gray-100">
          <div className="min-w-0">
            <div className="text-xs font-extrabold text-gray-500 uppercase tracking-wide">
              Modo enfoque
            </div>
            <h2 className="text-lg md:text-xl font-extrabold text-secondary truncate">
              {card.title}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl bg-gray-50 hover:bg-gray-100 border border-gray-200 transition-colors"
            aria-label="Cerrar overlay"
          >
            <span aria-hidden="true">✕</span>
          </button>
        </div>

        <div className="p-4 sm:p-6">
          <FeedPreviewRenderer previewKey={previewKey} previewType={card.type} size="focus" />

          <p className="mt-4 text-sm text-gray-600 leading-relaxed">{card.benefit}</p>
          <p className="mt-2 text-[11px] text-gray-500">
            {card.proof}
          </p>

          {card.type === "match" && topMatch && (
            <div className="mt-4">
              <ShareCard
                result={{
                  type: "quiz",
                  title: "Mi Match",
                  headline: topMatch.name,
                  subtitle: topMatch.party,
                  score: topMatch.compatibility,
                  details: ["Tu match en 60 segundos. Comparte y retá a un amigo."],
                }}
              />
            </div>
          )}

          <div className="mt-5 flex flex-col sm:flex-row gap-3">
            <a
              href={card.cta.href}
              className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-600 text-white font-extrabold px-6 py-3 rounded-xl shadow-card transition-all duration-200"
            >
              {card.cta.label}
              <span aria-hidden="true">→</span>
            </a>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-900 font-extrabold px-6 py-3 rounded-xl border border-gray-200 transition-colors"
            >
              Volver al feed
              <span aria-hidden="true">↩</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

