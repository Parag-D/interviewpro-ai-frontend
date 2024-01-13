import { create } from "zustand";

interface InterviewState {
  questions: { audio_url: string; title: string }[];
}

interface InterviewActions extends InterviewState {
  addQuestion: (audio_url: string, title: string) => void;
  setQuestions: (newQuestions: { audio_url: string; title: string }[]) => void;
}

const useInterviewStore = create<InterviewState & InterviewActions>((set) => ({
  questions: [],
  addQuestion: (audio_url, title) =>
    set((state) => ({ questions: [...state.questions, { audio_url, title }] })),
  setQuestions: (newQuestions) => set({ questions: newQuestions }),
}));

export default useInterviewStore;
