import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { DnaResultFromAPI } from "./api";

interface DnaTestState {
  testId: string | null;
  currentStep: number;
  totalSteps: number;
  answers: Record<string, { value: number; importance: number }>;
  results: DnaResultFromAPI | null;

  setTestId: (id: string) => void;
  setStep: (step: number, total: number) => void;
  setAnswer: (questionId: string, value: number, importance: number) => void;
  setResults: (results: DnaResultFromAPI) => void;
  reset: () => void;
}

export const useDnaStore = create<DnaTestState>()(
  persist(
    (set) => ({
      testId: null,
      currentStep: 0,
      totalSteps: 0,
      answers: {},
      results: null,

      setTestId: (id) => set({ testId: id }),
      setStep: (step, total) => set({ currentStep: step, totalSteps: total }),
      setAnswer: (questionId, value, importance) =>
        set((state) => ({
          answers: {
            ...state.answers,
            [questionId]: { value, importance },
          },
        })),
      setResults: (results) => set({ results }),
      reset: () =>
        set({
          testId: null,
          currentStep: 0,
          totalSteps: 0,
          answers: {},
          results: null,
        }),
    }),
    {
      name: "candidatazo-dna-test",
    }
  )
);

interface AppState {
  userId: string | null;
  setUserId: (id: string | null) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      userId: null,
      setUserId: (id) => set({ userId: id }),
    }),
    {
      name: "candidatazo-app",
    }
  )
);
