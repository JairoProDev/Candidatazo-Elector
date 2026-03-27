import type { FeedCardModel, FeedCardType } from "./feedTypes";
import type { StrategyWeights as StrategyWeightsReal } from "@/lib/strategy/election2026";
import { rankCardsV1 } from "./rankerV1";

export type InteractionSignalsByType = {
  clicksByType: Partial<Record<FeedCardType, number>>;
  timeMsByType: Partial<Record<FeedCardType, number>>;
};

function cardGroup(type: FeedCardType) {
  if (type === "verificador" || type === "watchlist") return "verificación";
  if (type === "planes" || type === "encuestas" || type === "analisis-2026") return "contexto";
  if (type === "segunda-vuelta" || type === "comparador-estrategico" || type === "radar") return "estrategia";
  if (type === "academia" || type === "desafio" || type === "cedula") return "aprendizaje";
  if (type === "comparador") return "comparación";
  return "match";
}

function formatCompact(n: number) {
  const abs = Math.abs(n);
  if (abs >= 1_000_000) return `${Math.round(n / 1_000_000)}M`;
  if (abs >= 1_000) return `${Math.round(n / 1_000)}k`;
  return String(Math.round(n));
}

export function rankCardsV2(
  templates: Array<{ type: FeedCardType; idBase: string }>,
  weights: StrategyWeightsReal | null,
  interaction: InteractionSignalsByType,
): { cards: Array<Pick<FeedCardModel, "type" | "rankingReason" | "score">> } {
  const base = rankCardsV1(templates, weights);
  const baseByType = new Map<FeedCardType, { score: number; rankingReason: string }>(
    base.cards.map((c) => [c.type, { score: c.score ?? 0, rankingReason: c.rankingReason }]),
  );

  const scored = templates.map((t) => {
    const b = baseByType.get(t.type) ?? { score: 0.2, rankingReason: "" };
    const clicks = interaction.clicksByType[t.type] ?? 0;
    const timeMs = interaction.timeMsByType[t.type] ?? 0;

    const clickBoost = Math.min(0.25, Math.log1p(clicks) * 0.06);
    const timeBoost = Math.min(0.25, Math.log1p(timeMs / 1000) * 0.03);
    const score = Math.max(0, Math.min(1, b.score + clickBoost + timeBoost));

    const suffix =
      clicks > 0
        ? ` · Ajustado por tu interés (${formatCompact(clicks)} ${clicks === 1 ? "vez" : "veces"}).`
        : "";

    return {
      type: t.type,
      rankingReason: `${b.rankingReason}${suffix}`,
      score,
      group: cardGroup(t.type),
    };
  });

  // Greedy with no-adjacent-same-group constraint
  const result: Array<Pick<FeedCardModel, "type" | "rankingReason" | "score">> = [];
  const remaining = [...scored].sort((a, b) => b.score - a.score);
  let lastGroup: string | null = null;

  while (remaining.length) {
    const idx = remaining.findIndex((c) => (lastGroup ? c.group !== lastGroup : true));
    const pickIdx = idx === -1 ? 0 : idx;
    const pick = remaining.splice(pickIdx, 1)[0];
    result.push({ type: pick.type, rankingReason: pick.rankingReason, score: pick.score });
    lastGroup = pick.group;
  }

  return { cards: result };
}

