import { create } from "zustand";

interface InterviewState {
  questionId: string;
  questions: { audio_url: string; title: string }[];
  feedback: Object;
}

interface InterviewActions extends InterviewState {
  addQuestion: (audio_url: string, title: string) => void;
  setQuestionId: (questionId: string) => void;
  setQuestions: (newQuestions: { audio_url: string; title: string }[]) => void;
  setFeedback: (feedback: Object) => void;
}

const useInterviewStore = create<InterviewState & InterviewActions>((set) => ({
  questionId: "",
  questions: [],
  addQuestion: (audio_url, title) =>
    set((state) => ({ questions: [...state.questions, { audio_url, title }] })),
  setQuestionId: (questionId) => set({ questionId }),
  setQuestions: (newQuestions) => set({ questions: newQuestions }),

  feedback: {},
  setFeedback: (feedback) => set({ feedback }),
}));

export default useInterviewStore;
