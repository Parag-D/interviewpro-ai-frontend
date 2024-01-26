import { get, post } from "./index";

interface InterviewResponse {
  // TODO: define response
  data: {
    message?: string;
    error?: string;
    video_url?: string;
    audio_url?: string;
  };
  success: boolean;
}

interface AnalysisResponse {
  data: {
    feedback: {
      [key: string]: {
        [key: string]: string;
      };
    };
    success: boolean;
  };
}

class InterviewApi {
  static async getInterviewQuestions(): Promise<InterviewResponse> {
    return get("/interview/questions");
  }

  static async sendVideo(questionId: string): Promise<InterviewResponse> {
    return post("/upload/video/" + questionId);
  }

  static async getAnalyticsByQuestionId(
    questionId: string
  ): Promise<AnalysisResponse> {
    return post("/analysis/" + questionId);
  }
}

export default InterviewApi;
