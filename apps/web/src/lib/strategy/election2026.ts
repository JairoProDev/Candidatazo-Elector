import type { Candidate2026ListItem } from "@/lib/data/candidates2026";

export type ContinuityPreference = "continuidad" | "mixto" | "disrupcion";

const legalRiskToNumber: Record<Candidate2026ListItem["legalRisk"], number> = {
  bajo: 1,
  medio: 0.6,
  alto: 0.3,
};

const continuityToNumber: Record<
  Candidate2026ListItem["continuityBlock"],
  number
> = {
  continuidad: 1,
  mixto: 0,
  disrupcion: -1,
};

export function getLegalRiskLabel(risk: Candidate2026ListItem["legalRisk"]) {
  if (risk === "alto") return "Alto";
  if (risk === "medio") return "Medio";
  return "Bajo";
}

export function getContinuityLabel(block: Candidate2026ListItem["continuityBlock"]) {
  if (block === "continuidad") return "Continuidad";
  if (block === "disrupcion") return "Disrupción";
  return "Mixto";
}

export function getContinuityPreferenceNumber(pref: ContinuityPreference) {
  if (pref === "continuidad") return 1;
  if (pref === "disrupcion") return -1;
  return 0;
}

export type SecondRoundWeights = {
  antiVote: number;
  legalRisk: number;
  truth: number;
  digital: number;
  continuity: number;
};

export const DEFAULT_SECOND_ROUND_WEIGHTS: SecondRoundWeights = {
  antiVote: 0.45,
  legalRisk: 0.15,
  truth: 0.15,
  digital: 0.1,
  continuity: 0.15,
};

function clamp01(n: number) {
  return Math.max(0, Math.min(1, n));
}

export type SecondRoundScoreBreakdown = {
  antiVoteComponent: number;
  legalRiskComponent: number;
  truthComponent: number;
  digitalComponent: number;
  continuityComponent: number;
  overallScore: number; // 0..1
};

export function scoreForSecondRound(
  candidate: Candidate2026ListItem,
  opts: {
    weights?: SecondRoundWeights;
    continuityPreference: ContinuityPreference;
  },
): SecondRoundScoreBreakdown {
  const weights = opts.weights ?? DEFAULT_SECOND_ROUND_WEIGHTS;

  // AntiVote: menor antivoto => mayor componente
  const antiVoteNorm = 1 - clamp01(candidate.antiVote / 100);
  const legalNorm = legalRiskToNumber[candidate.legalRisk]; // 0.3..1
  const truthNorm = clamp01(candidate.truthScore / 100);
  const digitalNorm = clamp01(candidate.digitalAgendaScore / 100);

  const candidateContinuity = continuityToNumber[candidate.continuityBlock]; // -1..1
  const pref = getContinuityPreferenceNumber(opts.continuityPreference);
  // Si pref == candidato, componente cercano a 1; si va en contra, cercano a 0.
  const continuityAlignment = clamp01((candidateContinuity * pref + 1) / 2);

  const overallScore =
    antiVoteNorm * weights.antiVote +
    legalNorm * weights.legalRisk +
    truthNorm * weights.truth +
    digitalNorm * weights.digital +
    continuityAlignment * weights.continuity;

  return {
    antiVoteComponent: antiVoteNorm,
    legalRiskComponent: legalNorm,
    truthComponent: truthNorm,
    digitalComponent: digitalNorm,
    continuityComponent: continuityAlignment,
    overallScore: clamp01(overallScore),
  };
}

export type SecondRoundPrediction = {
  winnerSlug: string;
  winnerName: string;
  loserSlug: string;
  loserName: string;
  winnerProbability: number; // 0..100
  breakdownWinner: SecondRoundScoreBreakdown;
  breakdownLoser: SecondRoundScoreBreakdown;
};

export function predictSecondRound(
  a: Candidate2026ListItem,
  b: Candidate2026ListItem,
  opts: {
    continuityPreference: ContinuityPreference;
    weights?: SecondRoundWeights;
  },
): SecondRoundPrediction {
  const breakdownA = scoreForSecondRound(a, opts);
  const breakdownB = scoreForSecondRound(b, opts);

  // Convertir a probabilidad: softmax simple
  const scoreA = breakdownA.overallScore;
  const scoreB = breakdownB.overallScore;
  const max = Math.max(scoreA, scoreB);
  const expA = Math.exp((scoreA - max) * 6);
  const expB = Math.exp((scoreB - max) * 6);
  const pA = expA / (expA + expB);
  const winner = scoreA >= scoreB ? a : b;
  const loser = winner.slug === a.slug ? b : a;
  const pWinner = winner.slug === a.slug ? pA : 1 - pA;

  return {
    winnerSlug: winner.slug,
    winnerName: winner.name,
    loserSlug: loser.slug,
    loserName: loser.name,
    winnerProbability: Math.round(pWinner * 1000) / 10,
    breakdownWinner: winner.slug === a.slug ? breakdownA : breakdownB,
    breakdownLoser: winner.slug === a.slug ? breakdownB : breakdownA,
  };
}

export type StrategyWeights = {
  economic: number;
  social: number;
  environment: number;
  security: number;
  institutional: number;
  digital: number;
  antiVote: number;
  legalRisk: number;
};

export function normalizeWeights(w: StrategyWeights) {
  const total =
    w.economic +
    w.social +
    w.environment +
    w.security +
    w.institutional +
    w.digital +
    w.antiVote +
    w.legalRisk;
  if (total <= 0) return w;
  const factor = 1 / total;
  return {
    economic: w.economic * factor,
    social: w.social * factor,
    environment: w.environment * factor,
    security: w.security * factor,
    institutional: w.institutional * factor,
    digital: w.digital * factor,
    antiVote: w.antiVote * factor,
    legalRisk: w.legalRisk * factor,
  };
}

export type StrategyScoreBreakdown = {
  positionsComponent: number; // 0..1
  digitalComponent: number; // 0..1
  antiVoteComponent: number; // 0..1
  legalRiskComponent: number; // 0.3..1
  overallScore: number; // 0..1
};

export function scoreCandidateStrategic(
  candidate: Candidate2026ListItem,
  weights: StrategyWeights,
): StrategyScoreBreakdown {
  const w = normalizeWeights(weights);

  const positions =
    (candidate.positions.economic / 100) * w.economic +
    (candidate.positions.social / 100) * w.social +
    (candidate.positions.environment / 100) * w.environment +
    (candidate.positions.security / 100) * w.security +
    (candidate.positions.institutional / 100) * w.institutional;

  const digitalComponent = clamp01(candidate.digitalAgendaScore / 100);
  const antiVoteComponent = 1 - clamp01(candidate.antiVote / 100);
  const legalRiskComponent = legalRiskToNumber[candidate.legalRisk];

  const overallScore = clamp01(
    positions * (1 - w.digital - w.antiVote - w.legalRisk) +
      digitalComponent * w.digital +
      antiVoteComponent * w.antiVote +
      legalRiskComponent * w.legalRisk,
  );

  return {
    positionsComponent: clamp01(positions),
    digitalComponent,
    antiVoteComponent,
    legalRiskComponent,
    overallScore,
  };
}

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function avgAbsDiff01(
  a: Record<string, number>,
  b: Record<string, number>,
  keys: string[],
) {
  if (!keys.length) return 0;
  const sum = keys.reduce((acc, k) => acc + Math.abs((a[k] ?? 0) - (b[k] ?? 0)), 0);
  return sum / keys.length / 100; // as 0..1 when values are 0..100
}

export function transferIdeologicalAffinity(
  pivot: Candidate2026ListItem,
  rival: Candidate2026ListItem,
) {
  // Afinidad 0..1: proximidad en posiciones + continuidad + agenda digital.
  const dims = ["economic", "social", "environment", "security", "institutional"];

  const distance = avgAbsDiff01(
    {
      economic: pivot.positions.economic,
      social: pivot.positions.social,
      environment: pivot.positions.environment,
      security: pivot.positions.security,
      institutional: pivot.positions.institutional,
    },
    {
      economic: rival.positions.economic,
      social: rival.positions.social,
      environment: rival.positions.environment,
      security: rival.positions.security,
      institutional: rival.positions.institutional,
    },
    dims,
  );

  const ideologicalAffinity = clamp01(1 - distance);

  const continuityPivot = pivot.continuityBlock === "continuidad" ? 1 : pivot.continuityBlock === "mixto" ? 0 : -1;
  const continuityRival = rival.continuityBlock === "continuidad" ? 1 : rival.continuityBlock === "mixto" ? 0 : -1;
  const continuityDistance = Math.abs(continuityPivot - continuityRival) / 2; // 0..1
  const continuityAffinity = clamp01(1 - continuityDistance);

  const digitalDistance = Math.abs(pivot.digitalAgendaScore - rival.digitalAgendaScore) / 100; // 0..1
  const digitalAffinity = clamp01(1 - digitalDistance);

  const overallAffinity = clamp01(
    ideologicalAffinity * 0.45 +
      continuityAffinity * 0.3 +
      digitalAffinity * 0.25,
  );

  return {
    ideologicalAffinity,
    continuityAffinity,
    digitalAffinity,
    overallAffinity,
  };
}

export function transferCompatibilityScore(
  pivot: Candidate2026ListItem,
  rival: Candidate2026ListItem,
  opts: {
    continuityPreference: ContinuityPreference;
    weights: SecondRoundWeights;
  },
) {
  const affinity = transferIdeologicalAffinity(pivot, rival);
  const pred = predictSecondRound(pivot, rival, {
    continuityPreference: opts.continuityPreference,
    weights: opts.weights,
  });

  const pPivotWins = pred.winnerSlug === pivot.slug ? pred.winnerProbability : 100 - pred.winnerProbability;
  const overall = clamp01((pPivotWins / 100) * affinity.overallAffinity);

  return {
    affinity,
    pPivotWins,
    overallScore: overall, // 0..1
  };
}

