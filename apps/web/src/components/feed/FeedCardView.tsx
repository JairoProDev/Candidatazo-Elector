"use client";

import { memo, useEffect, useMemo } from "react";
import type { FeedCardModel } from "@/lib/feed/feedTypes";
import { ToolCardFrame } from "./ToolCardFrame";
import { FeedPreviewRenderer } from "./FeedPreviewRenderer";
import { useFeedStore } from "@/lib/feed/feedStore";
import { trackFeedEventDev } from "@/lib/analytics/feedAnalytics";
import { useGamificationStore } from "@/lib/gamification";

function FeedCardViewImpl({
  card,
  isActive,
  onOpenFocus,
  onView,
  onInteract,
}: {
  card: FeedCardModel;
  isActive: boolean;
  onOpenFocus: (card: FeedCardModel) => void;
  onView?: (card: FeedCardModel) => void;
  onInteract?: (card: FeedCardModel) => void;
}) {
  const stableCardId = useMemo(() => card.id, [card.id]);
  const addXP = useGamificationStore((s) => s.addXP);

  // view event (solo cuando está activa)
  useEffect(() => {
    if (!isActive) return;
    onView?.(card);
    trackFeedEventDev(
      {
        cardId: stableCardId,
        cardType: card.type,
        action: "view_card",
        meta: { variant: card.variant ?? null },
      } as any,
      "feed_view_card",
    );
  }, [card, isActive, onView, stableCardId]);

  const preview = isActive ? (
    <FeedPreviewRenderer previewKey={card.preview.key} previewType={card.type} size="micro" />
  ) : (
    <div className="h-full flex items-center justify-center text-sm text-gray-500">
      Desliza para ver la demo
    </div>
  );

  const handleCta = () => {
    // Small XP bump for using the tool CTA from the feed.
    // We avoid incrementing milestone counters here to not "complete" tools prematurely.
    const prevClicks = useFeedStore.getState().ctaClicksByCardId[card.id] ?? 0;
    useFeedStore.getState().recordCtaClick(card.id);
    onInteract?.(card);
    trackFeedEventDev(
      {
        cardId: stableCardId,
        cardType: card.type,
        action: "cta_click",
        meta: { href: card.cta.href },
      } as any,
      "feed_cta_click",
    );

    addXP(prevClicks === 0 ? 15 : 5, "CTA en feed");

    trackFeedEventDev(
      {
        cardId: stableCardId,
        cardType: card.type,
        action: "interact_card",
        meta: { href: card.cta.href, via: "cta_button" },
      } as any,
      "feed_interact_card",
    );
  };

  return (
    <ToolCardFrame
      card={card}
      preview={preview}
      onCta={handleCta}
      onOpenFocus={() => onOpenFocus(card)}
    />
  );
}

export const FeedCardView = memo(FeedCardViewImpl, (prev, next) => {
  return prev.card.id === next.card.id && prev.isActive === next.isActive;
});

