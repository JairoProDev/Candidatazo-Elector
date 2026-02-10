import type { DnaScores, DnaAnswer, MatchBreakdown, CandidatePositions } from "@candidatazo/types";

/**
 * Calculate DNA scores from a list of answers.
 * Groups answers by dimension and computes weighted averages.
 * Returns scores normalized to 0-100 scale.
 */
export function calculateDnaScores(
  answers: DnaAnswer[],
  questionDimensions: Record<string, string>
): DnaScores {
  const dimensionTotals: Record<string, { sum: number; weight: number }> = {
    ECONOMIC: { sum: 0, weight: 0 },
    SOCIAL: { sum: 0, weight: 0 },
    ENVIRONMENT: { sum: 0, weight: 0 },
    SECURITY: { sum: 0, weight: 0 },
    INSTITUTIONAL: { sum: 0, weight: 0 },
  };

  for (const answer of answers) {
    const dimension = questionDimensions[answer.questionId];
    if (!dimension || !dimensionTotals[dimension]) continue;

    const importance = answer.importance || 3;
    dimensionTotals[dimension].sum += answer.value * importance;
    dimensionTotals[dimension].weight += importance;
  }

  const scores: DnaScores = {
    economic: 50,
    social: 50,
    environment: 50,
    security: 50,
    institutional: 50,
  };

  for (const [dim, totals] of Object.entries(dimensionTotals)) {
    if (totals.weight > 0) {
      // Convert from -100..100 to 0..100
      const raw = totals.sum / totals.weight;
      const key = dim.toLowerCase() as keyof DnaScores;
      scores[key] = Math.round(((raw + 100) / 200) * 100);
    }
  }

  return scores;
}

/**
 * Calculate match score between user scores and candidate positions.
 * Uses weighted cosine-like similarity, returns 0-100.
 */
export function calculateMatchScore(
  userScores: DnaScores,
  candidatePositions: CandidatePositions
): { overallScore: number; breakdown: MatchBreakdown } {
  const dimensions: (keyof DnaScores)[] = [
    "economic",
    "social",
    "environment",
    "security",
    "institutional",
  ];

  const breakdown: MatchBreakdown = {
    economic: 0,
    social: 0,
    environment: 0,
    security: 0,
    institutional: 0,
  };

  let totalScore = 0;

  for (const dim of dimensions) {
    const userVal = userScores[dim];
    const candVal = candidatePositions[dim];
    // Similarity: 100 - absolute difference
    const similarity = Math.max(0, 100 - Math.abs(userVal - candVal));
    breakdown[dim] = Math.round(similarity);
    totalScore += similarity;
  }

  const overallScore = Math.round(totalScore / dimensions.length);

  return { overallScore, breakdown };
}

/**
 * Determine the user's political tribe based on their DNA scores.
 */
export function determineTribe(scores: DnaScores): string {
  const { economic, social, environment, security, institutional } = scores;

  // Centro: all scores between 35-65
  const isCentrist = Object.values(scores).every(
    (s) => s >= 35 && s <= 65
  );
  if (isCentrist) return "Centro Pragmatico";

  // Progresista: high social + environment
  if (social > 65 && environment > 60) {
    if (economic > 60) return "Liberal Progresista";
    return "Izquierda Progresista";
  }

  // Conservador: low social
  if (social < 40) {
    if (economic > 60) return "Derecha Conservadora";
    if (security > 65) return "Conservador Autoritario";
    return "Conservador Tradicional";
  }

  // Libertario: high economic + high social
  if (economic > 70 && social > 55) return "Libertario";

  // Reformista
  if (institutional > 70) {
    if (social > 55) return "Reformista Progresista";
    return "Reformista Moderado";
  }

  // Ambientalista
  if (environment > 75) return "Ambientalista";

  // Populista: mix of interventionist economy + strong security
  if (economic < 40 && security > 60) return "Populista";

  // Default
  if (economic > 55) return "Centro Derecha";
  return "Centro Izquierda";
}

/**
 * Generate a slug from a string (URL-safe).
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/**
 * Format a percentage for display.
 */
export function formatPercent(value: number): string {
  return `${Math.round(value)}%`;
}

/**
 * Generate a referral code.
 */
export function generateReferralCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < 8; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}

/**
 * Clamp a value between min and max.
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Format relative time in Spanish (e.g. "hace 5 minutos").
 */
export function timeAgo(date: Date | string): string {
  const now = new Date();
  const past = new Date(date);
  const seconds = Math.floor((now.getTime() - past.getTime()) / 1000);

  if (seconds < 60) return "hace un momento";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `hace ${minutes} ${minutes === 1 ? "minuto" : "minutos"}`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `hace ${hours} ${hours === 1 ? "hora" : "horas"}`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `hace ${days} ${days === 1 ? "dia" : "dias"}`;
  const months = Math.floor(days / 30);
  if (months < 12) return `hace ${months} ${months === 1 ? "mes" : "meses"}`;
  const years = Math.floor(months / 12);
  return `hace ${years} ${years === 1 ? "año" : "años"}`;
}
