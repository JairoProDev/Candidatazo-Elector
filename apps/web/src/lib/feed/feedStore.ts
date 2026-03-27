"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { StrategyWeights } from "@/lib/strategy/election2026";
import type { FeedMatchState } from "./feedTypes";

const STORAGE_KEY = "candidatazo:feed";

export interface FeedStoreState {
  /** Shared personalization state */
  match: FeedMatchState;

  /** Resume */
  lastCardIndex: number;

  /** Interaction history */
  ctaClicksByCardId: Record<string, number>;
  /** Time signals (ms) accumulated per card id */
  timeMsByCardId: Record<string, number>;

  /** Actions */
  setMatchWeights: (weights: StrategyWeights) => void;
  setTopMatch: (next: FeedMatchState["topMatch"]) => void;
  recordCtaClick: (cardId: string) => void;
  addTimeOnCard: (cardId: string, ms: number) => void;
  setLastCardIndex: (idx: number) => void;
  resetFeedState: () => void;
}

export const useFeedStore = create<FeedStoreState>()(
  persist(
    (set) => ({
      match: {
        weights: null,
        topMatch: undefined,
      },
      lastCardIndex: 0,
      ctaClicksByCardId: {},
      timeMsByCardId: {},

      setMatchWeights: (weights) => set((s) => ({ match: { ...s.match, weights } })),
      setTopMatch: (next) => set((s) => ({ match: { ...s.match, topMatch: next } })),
      recordCtaClick: (cardId) =>
        set((s) => ({
          ctaClicksByCardId: {
            ...s.ctaClicksByCardId,
            [cardId]: (s.ctaClicksByCardId[cardId] ?? 0) + 1,
          },
        })),
      addTimeOnCard: (cardId, ms) =>
        set((s) => ({
          timeMsByCardId: {
            ...s.timeMsByCardId,
            [cardId]: (s.timeMsByCardId[cardId] ?? 0) + Math.max(0, ms),
          },
        })),
      setLastCardIndex: (idx) => set({ lastCardIndex: idx }),
      resetFeedState: () =>
        set({
          match: { weights: null, topMatch: undefined },
          lastCardIndex: 0,
          ctaClicksByCardId: {},
          timeMsByCardId: {},
        }),
    }),
    {
      name: STORAGE_KEY,
      partialize: (s) => ({
        match: s.match,
        lastCardIndex: s.lastCardIndex,
        ctaClicksByCardId: s.ctaClicksByCardId,
        timeMsByCardId: s.timeMsByCardId,
      }),
    },
  ),
);

