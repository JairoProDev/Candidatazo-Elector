import type { FeedCardModel, FeedCardType } from "./feedTypes";
import type { StrategyWeights as StrategyWeightsReal } from "@/lib/strategy/election2026";
import { FEED_CARD_CATALOG, FEED_CARD_TYPES } from "./feedCatalog";
import { rankCardsV1 } from "./rankerV1";
import type { InteractionSignalsByType } from "./rankerV2";
import { rankCardsV2 } from "./rankerV2";

// Deterministic pseudo RNG for repeatable chunk variants.
function lcg(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (1664525 * s + 1013904223) >>> 0;
    return s / 0xffffffff;
  };
}

function hashString(s: string) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export type FeedChunkInput = {
  offset: number;
  weights: StrategyWeightsReal | null;
  topDimensionHint?: keyof StrategyWeightsReal;
  matchSeed?: string;
  chunkSize?: number;
  interactionSignals?: InteractionSignalsByType;
};

export function generateFeedChunk(input: FeedChunkInput): FeedCardModel[] {
  const chunkSize = input.chunkSize ?? 8;
  const seed = hashString(String(input.matchSeed ?? "") + "|" + input.offset);
  const rnd = lcg(seed);

  // Select a subset biased by ranker scores (we still keep some variety).
  const templates = FEED_CARD_TYPES.map((type) => ({
    type,
    idBase: `${input.offset}-${type}`,
  }));

  const hasInteraction = Boolean(
    input.interactionSignals &&
      ((Object.values(input.interactionSignals.clicksByType ?? {}).reduce((a, b) => a + (b ?? 0), 0) > 0) ||
        (Object.values(input.interactionSignals.timeMsByType ?? {}).reduce((a, b) => a + (b ?? 0), 0) > 0)),
  );

  const ranked = hasInteraction
    ? rankCardsV2(templates, input.weights ?? null, input.interactionSignals!)
    : rankCardsV1(templates, input.weights ?? null, { topDimension: input.topDimensionHint });

  const cards = ranked.cards;

  const orderedTypes: FeedCardType[] = cards
    .map((c) => c.type)
    .filter((t, idx, arr) => arr.indexOf(t) === idx);

  const chosen = orderedTypes.slice(0, Math.min(orderedTypes.length, chunkSize));

  const variantBase = Math.floor(rnd() * 3);

  return chosen.map((type, idx) => {
    const tpl = FEED_CARD_CATALOG[type];
    const variant = variantBase + idx;
    const id = `${input.offset}-${type}-${variant}`;

    const ranked = cards.find((c) => c.type === type);
    return {
      id,
      type,
      title: tpl.title,
      benefit: tpl.benefit,
      proof: tpl.proof,
      rankingReason: ranked?.rankingReason ?? "",
      score: ranked?.score ?? 0,
      variant,
      cta: tpl.cta,
      preview: tpl.preview as { key: typeof tpl.preview.key; props?: Record<string, unknown> },
    };
  });
}

