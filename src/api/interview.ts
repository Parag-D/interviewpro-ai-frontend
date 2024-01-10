import { get } from "./index";

interface InterviewResponse {
  // TODO: define response
  data: {
    message?: string;
    error?: string;
  };
  success: boolean;
}

class InterviewApi {
  static async getInterviewQuestions(): Promise<InterviewResponse> {
    return get("/interview/questions");
  }
}

export default InterviewApi;
