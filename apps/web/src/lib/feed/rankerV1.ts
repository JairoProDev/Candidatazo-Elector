import type { FeedCardModel, FeedCardType, RankingContext } from "./feedTypes";
import type { StrategyWeights } from "@/lib/strategy/election2026";
import { FEED_CARD_CATALOG } from "./feedCatalog";

const TOP_DIMENSION_LABEL: Record<keyof StrategyWeights, string> = {
  economic: "economía",
  social: "social",
  environment: "ambiente",
  security: "seguridad",
  institutional: "instituciones",
  digital: "agenda digital",
  antiVote: "antivoto",
  legalRisk: "riesgo legal",
};

function pickTopDimension(weights: StrategyWeights) {
  const entries = Object.entries(weights) as Array<[keyof StrategyWeights, number]>;
  entries.sort((a, b) => b[1] - a[1]);
  return entries[0]?.[0];
}

function normalizeWeights(weights: StrategyWeights) {
  const total = Object.values(weights).reduce((acc, n) => acc + n, 0);
  if (!total) return weights;
  const factor = 1 / total;
  return Object.fromEntries(
    Object.entries(weights).map(([k, v]) => [k, v * factor]),
  ) as StrategyWeights;
}

const CARD_DIM_MAP: Record<FeedCardType, Array<keyof StrategyWeights>> = {
  match: ["economic", "social", "security", "digital", "institutional", "antiVote", "legalRisk"],
  cedula: ["antiVote", "legalRisk", "digital"],
  comparador: ["economic", "social", "security", "digital", "antiVote", "institutional"],
  verificador: ["legalRisk", "antiVote", "institutional"],
  planes: ["economic", "social", "environment", "institutional", "digital"],
  encuestas: ["social", "economic", "digital"],
  desafio: ["social", "security", "digital"],
  academia: ["institutional", "social"],
  radar: ["digital", "institutional", "security", "legalRisk"],
  watchlist: ["legalRisk", "antiVote", "digital"],
  "segunda-vuelta": ["antiVote", "legalRisk", "digital", "institutional"],
  "comparador-estrategico": ["antiVote", "legalRisk", "digital", "institutional"],
  "analisis-2026": ["institutional", "digital", "security", "legalRisk"],
};

function getScoreForCard(type: FeedCardType, weights: StrategyWeights) {
  const nw = normalizeWeights(weights);
  const dims = CARD_DIM_MAP[type];
  if (!dims.length) return 0.2;
  const score = dims.reduce((acc, d) => acc + (nw[d] ?? 0), 0) / dims.length;
  return Math.max(0, Math.min(1, score));
}

function getRankingReason(type: FeedCardType, weights: StrategyWeights): string {
  const topDim = pickTopDimension(weights);
  const topLabel = topDim ? TOP_DIMENSION_LABEL[topDim] : "tus prioridades";

  switch (type) {
    case "match":
      return `Porque calibrar tu criterio por ${topLabel} te da decisiones más nítidas.`;
    case "cedula":
      return `Para transformar tu ${topLabel} en una regla práctica (evitar voto nulo).`;
    case "comparador":
      return `Cuando priorizas ${topLabel}, comparar dimensiones reduce el ruido mental.`;
    case "verificador":
      return `Tu prioridad en ${topLabel} se traduce en evidencia: fuentes y contexto.`;
    case "planes":
      return `Si te importa ${topLabel}, mira qué planes realmente lo aterrizan en propuestas.`;
    case "encuestas":
      return `Tu foco en ${topLabel} te ayuda a leer momentum y escenarios de segunda vuelta.`;
    case "desafio":
      return `Tu energía en ${topLabel} se mantiene con ritmo: micro-quiz + XP.`;
    case "academia":
      return `Para entender ${topLabel} con estructura: aprende jugando, no leyendo pesado.`;
    case "radar":
      return `Si priorizas ${topLabel}, el radar te muestra ejecución y oportunidad por perfil.`;
    case "watchlist":
      return `Porque ${topLabel} cambia: guarda y detecta señales en tu navegador.`;
    case "segunda-vuelta":
      return `Tu criterio por ${topLabel} se vuelve escenario: simula balotaje sin adivinar.`;
    case "comparador-estrategico":
      return `Cuando pones pesos (como con ${topLabel}), este panel recalibra tu estrategia.`;
    case "analisis-2026":
      return `Para reducir incertidumbre en ${topLabel}: contexto que conecta señales.`;
    default: {
      const _exhaustive: never = type;
      return String(_exhaustive);
    }
  }
}

function cardGroup(type: FeedCardType) {
  if (type === "verificador" || type === "watchlist") return "verificación";
  if (type === "planes" || type === "encuestas" || type === "analisis-2026") return "contexto";
  if (type === "segunda-vuelta" || type === "comparador-estrategico" || type === "radar") return "estrategia";
  if (type === "academia" || type === "desafio" || type === "cedula") return "aprendizaje";
  if (type === "comparador") return "comparación";
  return "match";
}

export function rankCardsV1(
  templates: Array<{ type: FeedCardType; idBase: string }>,
  weights: StrategyWeights | null,
  ctx: RankingContext = {},
): { cards: Array<Pick<FeedCardModel, "type" | "rankingReason" | "score">>; topDimension?: keyof StrategyWeights } {
  const effectiveWeights =
    weights ??
    ({
      economic: 1,
      social: 1,
      environment: 0,
      security: 1,
      institutional: 1,
      digital: 1,
      antiVote: 1,
      legalRisk: 1,
    } satisfies StrategyWeights);

  const topDimension = effectiveWeights ? pickTopDimension(effectiveWeights) : undefined;

  const scored = templates.map((t) => {
    const score = getScoreForCard(t.type, effectiveWeights);
    const rankingReason = getRankingReason(t.type, effectiveWeights);
    return { ...t, score, rankingReason, group: cardGroup(t.type) };
  });

  // Greedy with no-adjacent-same-group constraint (simple diversity)
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

  return { cards: result, topDimension: topDimension as keyof StrategyWeights | undefined };
}

export function getCardTemplate(type: FeedCardType) {
  return FEED_CARD_CATALOG[type];
}

