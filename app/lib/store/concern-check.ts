import { create } from "zustand";

type Answers = Record<string, string>;

interface ConcernCheckState {
  situationId: string | null;
  index: number;
  answers: Answers;
  start: (situationId: string) => void;
  setAnswer: (questionId: string, value: string) => void;
  next: () => void;
  back: () => void;
  reset: () => void;
}

/**
 * Holds the in-progress Concern Check. Starting a different situation clears
 * previous answers. (sessionStorage persistence is a planned refinement.)
 */
export const useConcernCheck = create<ConcernCheckState>((set) => ({
  situationId: null,
  index: 0,
  answers: {},
  start: (situationId) =>
    set((s) => (s.situationId === situationId ? s : { situationId, index: 0, answers: {} })),
  setAnswer: (questionId, value) =>
    set((s) => ({ answers: { ...s.answers, [questionId]: value } })),
  next: () => set((s) => ({ index: s.index + 1 })),
  back: () => set((s) => ({ index: Math.max(0, s.index - 1) })),
  reset: () => set({ situationId: null, index: 0, answers: {} }),
}));
