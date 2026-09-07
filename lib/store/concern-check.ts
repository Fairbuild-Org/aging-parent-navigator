import { create } from "zustand";

type Answers = Record<string, string | string[]>;

interface ConcernCheckState {
  situationId: string | null;
  index: number;
  answers: Answers;
  start: (situationId: string) => void;
  setAnswer: (questionId: string, value: string) => void;
  toggleMultiAnswer: (questionId: string, value: string, exclusive?: string) => void;
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
  // For a multi-select question: toggles `value` in the selection. If `value`
  // is the designated `exclusive` option (e.g. "none of these"), selecting it
  // clears everything else; selecting any other option clears `exclusive`.
  toggleMultiAnswer: (questionId, value, exclusive) =>
    set((s) => {
      const current = s.answers[questionId];
      const selected = Array.isArray(current) ? current : [];
      let next: string[];
      if (value === exclusive) {
        next = selected.includes(value) ? [] : [value];
      } else if (selected.includes(value)) {
        next = selected.filter((v) => v !== value);
      } else {
        next = [...selected.filter((v) => v !== exclusive), value];
      }
      return { answers: { ...s.answers, [questionId]: next } };
    }),
  next: () => set((s) => ({ index: s.index + 1 })),
  back: () => set((s) => ({ index: Math.max(0, s.index - 1) })),
  reset: () => set({ situationId: null, index: 0, answers: {} }),
}));
