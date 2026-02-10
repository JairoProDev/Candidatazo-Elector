// ==================== DNA Test Types ====================

export interface DnaScores {
  economic: number;
  social: number;
  environment: number;
  security: number;
  institutional: number;
}

export interface DnaAnswer {
  questionId: string;
  value: number; // -100 to 100
  importance: number; // 1-5
}

export interface DnaResult {
  scores: DnaScores;
  tribe: string;
  summary: string;
  topMatches: CandidateMatchPreview[];
}

export interface DnaQuestionOption {
  value: number;
  label: string;
}

export interface DnaQuestionData {
  id: string;
  text: string;
  description?: string;
  dimension: Dimension;
  order: number;
  options: DnaQuestionOption[];
  context?: string;
}

export type Dimension =
  | "ECONOMIC"
  | "SOCIAL"
  | "ENVIRONMENT"
  | "SECURITY"
  | "INSTITUTIONAL";

// ==================== Candidate Types ====================

export interface CandidatePositions {
  economic: number;
  social: number;
  environment: number;
  security: number;
  institutional: number;
}

export interface CandidateProfile {
  id: string;
  name: string;
  slug: string;
  party: string;
  partyLogo?: string;
  photo: string;
  age: number;
  bio: string;
  positions: CandidatePositions;
  planSummary?: string;
  truthScore: number;
  twitter?: string;
  facebook?: string;
  instagram?: string;
  website?: string;
}

export interface CandidateMatchPreview {
  candidateId: string;
  candidateName: string;
  candidatePhoto: string;
  candidateParty: string;
  overallScore: number;
}

// ==================== Match Types ====================

export interface MatchBreakdown {
  economic: number;
  social: number;
  environment: number;
  security: number;
  institutional: number;
}

export interface MatchDetail {
  id: string;
  candidate: CandidateProfile;
  overallScore: number;
  breakdown: MatchBreakdown;
  agreements: PositionComparison[];
  disagreements: PositionComparison[];
}

export interface PositionComparison {
  topic: string;
  dimension: Dimension;
  userPosition: number;
  candidatePosition: number;
  difference: number;
}

// ==================== Fact Check Types ====================

export type VerdictType =
  | "TRUE"
  | "MOSTLY_TRUE"
  | "HALF_TRUE"
  | "MOSTLY_FALSE"
  | "FALSE"
  | "MISLEADING"
  | "UNVERIFIABLE";

export interface FactCheckSource {
  title: string;
  url: string;
  snippet?: string;
}

export interface FactCheckData {
  id: string;
  claim: string;
  context?: string;
  claimedAt?: string;
  source?: string;
  verdict: VerdictType;
  explanation: string;
  sources: FactCheckSource[];
  confidence?: number;
  aiGenerated: boolean;
  candidateName?: string;
  candidatePhoto?: string;
  upvotes: number;
  downvotes: number;
  featured: boolean;
  publishedAt: string;
}

// ==================== Tribe Types ====================

export interface TribeData {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon?: string;
  color?: string;
  memberCount: number;
}

// ==================== API Response Types ====================

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface ApiError {
  success: false;
  error: string;
  statusCode: number;
  details?: unknown;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// ==================== Verdict Display Helpers ====================

export const VERDICT_CONFIG: Record<
  VerdictType,
  { label: string; color: string; emoji: string; bgColor: string }
> = {
  TRUE: {
    label: "Verdadero",
    color: "#10B981",
    emoji: "checkmark",
    bgColor: "#ECFDF5",
  },
  MOSTLY_TRUE: {
    label: "Mayormente verdadero",
    color: "#34D399",
    emoji: "check",
    bgColor: "#ECFDF5",
  },
  HALF_TRUE: {
    label: "A medias",
    color: "#F59E0B",
    emoji: "warning",
    bgColor: "#FFFBEB",
  },
  MOSTLY_FALSE: {
    label: "Mayormente falso",
    color: "#F97316",
    emoji: "alert",
    bgColor: "#FFF7ED",
  },
  FALSE: {
    label: "Falso",
    color: "#EF4444",
    emoji: "x",
    bgColor: "#FEF2F2",
  },
  MISLEADING: {
    label: "Engañoso",
    color: "#8B5CF6",
    emoji: "question",
    bgColor: "#F5F3FF",
  },
  UNVERIFIABLE: {
    label: "No verificable",
    color: "#6B7280",
    emoji: "minus",
    bgColor: "#F9FAFB",
  },
};

// ==================== Dimension Display Helpers ====================

export const DIMENSION_CONFIG: Record<
  Dimension,
  { label: string; description: string; icon: string; color: string }
> = {
  ECONOMIC: {
    label: "Economía",
    description: "Libre mercado vs intervención estatal",
    icon: "chart-line",
    color: "#2D5BFF",
  },
  SOCIAL: {
    label: "Social",
    description: "Progresista vs conservador",
    icon: "account-group",
    color: "#7C3AED",
  },
  ENVIRONMENT: {
    label: "Medio Ambiente",
    description: "Conservacionista vs desarrollo",
    icon: "leaf",
    color: "#10B981",
  },
  SECURITY: {
    label: "Seguridad",
    description: "Mano dura vs derechos civiles",
    icon: "shield-check",
    color: "#F59E0B",
  },
  INSTITUTIONAL: {
    label: "Instituciones",
    description: "Reformista vs status quo",
    icon: "bank",
    color: "#EF4444",
  },
};
