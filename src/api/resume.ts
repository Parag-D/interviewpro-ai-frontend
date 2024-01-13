import { QuestionsArray } from "@/types/interview";
import { post } from "./index";

interface ResumeResponse {
  name?: string; // AXIOS_ERROR
  // TODO: define response
  data: {
    questionId: string;
    questions: QuestionsArray;
    error?: string;
  };
  success: boolean;
}

class ResumeApi {
  static async uploadResume(data: FormData): Promise<ResumeResponse> {
    // const payload = {
    //   resume: data,
    // };

    return post("/upload/resume", data);
  }
}

export default ResumeApi;
