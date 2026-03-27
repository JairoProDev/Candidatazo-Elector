"use client";

import { FEED_CARD_CATALOG, FEED_CARD_TYPES } from "@/lib/feed/feedCatalog";
import { FeedCardModel, FeedCardType } from "@/lib/feed/feedTypes";
import { FeedPreviewRenderer } from "@/components/feed/FeedPreviewRenderer";
import { ToolCardFrame } from "@/components/feed/ToolCardFrame";

const DEFAULT_CARD = {
  rankingReason: "Sandbox: vista aislada para QA",
  score: 0.5,
  variant: 0,
};

function makeSandboxCard(type: FeedCardType): FeedCardModel {
  const tpl = FEED_CARD_CATALOG[type];
  return {
    id: `sandbox-${type}`,
    type,
    title: tpl.title,
    benefit: tpl.benefit,
    proof: tpl.proof,
    rankingReason: DEFAULT_CARD.rankingReason,
    cta: tpl.cta,
    preview: tpl.preview,
    score: DEFAULT_CARD.score,
    variant: DEFAULT_CARD.variant,
  };
}

export default function FeedSandboxPage() {
  return (
    <div className="min-h-[calc(100vh-64px)] px-4 sm:px-6 py-10">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-extrabold text-secondary">
          Feed Sandbox (QA)
        </h1>
        <p className="mt-2 text-gray-600 max-w-2xl">
          Renderiza cada card del feed en aislamiento para validar micro-experiencias, CTAs y fuentes.
        </p>

        <div className="mt-8 space-y-6">
          {FEED_CARD_TYPES.map((type) => {
            const card = makeSandboxCard(type);
            return (
              <div key={type} className="border border-gray-100 rounded-[2rem] p-4 bg-white/80">
                <ToolCardFrame
                  card={card}
                  preview={
                    <div className="max-h-[56vh] overflow-hidden">
                      <FeedPreviewRenderer
                        previewKey={card.preview.key}
                        previewType={card.type}
                        size="focus"
                      />
                    </div>
                  }
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

