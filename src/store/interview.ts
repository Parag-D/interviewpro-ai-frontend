import { create } from "zustand";

interface InterviewState {
  questionId: string;
  questions: { audio_url: string; title: string }[];
}

interface InterviewActions extends InterviewState {
  addQuestion: (audio_url: string, title: string) => void;
  setQuestionId: (questionId: string) => void;
  setQuestions: (newQuestions: { audio_url: string; title: string }[]) => void;
}

const useInterviewStore = create<InterviewState & InterviewActions>((set) => ({
  questionId: "65a29d3ed4c5901bca148502",
  questions: [
    {
      audio_url:
        "https://mockinterviewai.s3.ap-south-1.amazonaws.com/audio/Introduce_yourself.mp3",
      title: "Introduce yourself",
    },
    {
      audio_url:
        "https://mockinterviewai.s3.ap-south-1.amazonaws.com/audio/What_is_Retrieval_Augmented_Generation_RAG.mp3",
      title: "What is Retrieval Augmented Generation (RAG)?",
    },
    {
      audio_url:
        "https://mockinterviewai.s3.ap-south-1.amazonaws.com/audio/Explain_the_difference_between_ANN_CNN_and_RNN.mp3",
      title: "Explain the difference between ANN, CNN, and RNN",
    },
    {
      audio_url:
        "https://mockinterviewai.s3.ap-south-1.amazonaws.com/audio/What_are_the_key_components_of_Transformer_Architectures_like_BERT_GPT.mp3",
      title:
        "What are the key components of Transformer Architectures like BERT, GPT?",
    },
    {
      audio_url:
        "https://mockinterviewai.s3.ap-south-1.amazonaws.com/audio/How_would_you_validate_and_create_prompts_for_GPT3ChatGPT_models.mp3",
      title:
        "How would you validate and create prompts for GPT-3/ChatGPT models?",
    },
    {
      audio_url:
        "https://mockinterviewai.s3.ap-south-1.amazonaws.com/audio/Can_you_explain_the_process_of_data_cleaning_and_preprocessing_with_NLP_techniques.mp3",
      title:
        "Can you explain the process of data cleaning and preprocessing with NLP techniques?",
    },
    {
      audio_url:
        "https://mockinterviewai.s3.ap-south-1.amazonaws.com/audio/What_challenges_did_you_face_while_developing_the_AIPowered_Mock_Interview_Platform.mp3",
      title:
        "What challenges did you face while developing the AI-Powered Mock Interview Platform?",
    },
    {
      audio_url:
        "https://mockinterviewai.s3.ap-south-1.amazonaws.com/audio/How_did_you_measure_the_effectiveness_of_the_AIPowered_Mock_Interview_Platform.mp3",
      title:
        "How did you measure the effectiveness of the AI-Powered Mock Interview Platform?",
    },
    {
      audio_url:
        "https://mockinterviewai.s3.ap-south-1.amazonaws.com/audio/What_approach_did_you_take_in_the_Automated_Educational_Assessment_System_to_enhance_adaptability_to_student_queries.mp3",
      title:
        "What approach did you take in the 'Automated Educational Assessment System' to enhance adaptability to student queries?",
    },
    {
      audio_url:
        "https://mockinterviewai.s3.ap-south-1.amazonaws.com/audio/What_impact_did_the_project_Knowledge_Ocean_from_Video_Transcripts_have_on_student_query_resolution_systems.mp3",
      title:
        "What impact did the project 'Knowledge Ocean from Video Transcripts' have on student query resolution systems?",
    },
    {
      audio_url:
        "https://mockinterviewai.s3.ap-south-1.amazonaws.com/audio/How_did_you_optimize_response_time_and_resolution_efficiency_in_the_live_chat_support_channels_during_your_tenure_as_an_Associate_Tech_Engineer.mp3",
      title:
        "How did you optimize response time and resolution efficiency in the live chat support channels during your tenure as an Associate Tech Engineer?",
    },
    {
      audio_url:
        "https://mockinterviewai.s3.ap-south-1.amazonaws.com/audio/What_were_the_key_factors_contributing_to_fostering_positive_customer_relationships_during_your_tenure_as_an_Associate_Tech_Engineer.mp3",
      title:
        "What were the key factors contributing to fostering positive customer relationships during your tenure as an Associate Tech Engineer?",
    },
  ],
  addQuestion: (audio_url, title) => {
    // set((state) => ({ questions: [...state.questions, { audio_url, title }] }));
  },
  setQuestionId: (questionId) => {
    // set({ questionId });
  },
  setQuestions: (newQuestions) => set({ questions: newQuestions }),
}));

export default useInterviewStore;
