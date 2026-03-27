import type { StrategyWeights } from "@/lib/strategy/election2026";

export type FeedCardType =
  | "match"
  | "cedula"
  | "comparador"
  | "verificador"
  | "planes"
  | "encuestas"
  | "desafio"
  | "academia"
  | "radar"
  | "watchlist"
  | "segunda-vuelta"
  | "comparador-estrategico"
  | "analisis-2026";

export type FeedPreviewKey =
  | "LandingPriorityGame"
  | "CedulaPreviewMini"
  | "ComparadorPreviewMini"
  | "VerificadorPreviewMini"
  | "PlanesPreviewMini"
  | "EncuestasPreviewMini"
  | "DesafioPreviewMini"
  | "AcademiaPreviewMini"
  | "DigitalOpportunityRadar"
  | "WatchlistPanel"
  | "SecondRoundSimulatorPanel"
  | "StrategicComparatorPanel"
  | "AnalisisPreviewMini";

export type FeedCardCTA = {
  label: string;
  href: string;
};

export type RankingContext = {
  topDimension?: keyof StrategyWeights;
};

export interface FeedCardModel {
  /** Stable id for analytics + resume */
  id: string;
  type: FeedCardType;
  title: string;
  benefit: string;
  proof: string;
  rankingReason: string;
  cta: FeedCardCTA;
  preview: {
    key: FeedPreviewKey;
    /** Extra props consumed by the card preview renderer */
    props?: Record<string, unknown>;
  };
  /** Optional ordering score (used by the ranker) */
  score?: number;
  /** For debug rendering / A-B copy later */
  variant?: number;
}

export interface FeedMatchState {
  weights: StrategyWeights | null;
  /** Candidate info for share / UI (optional) */
  topMatch?: { slug: string; name: string; party: string; compatibility: number };
}

export interface FeedAnalyticsPayload {
  cardId: string;
  cardType: FeedCardType;
  action:
    | "view_card"
    | "interact_card"
    | "cta_click"
    | "overlay_open"
    | "overlay_close"
    | "time_on_card"
    | "back_to_feed";
  /** Optional metadata, keep it flat */
  meta?: Record<string, string | number | boolean | null>;
}

