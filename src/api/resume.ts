import { post } from "./index";

interface ResumeResponse {
  // TODO: define response
  data: {
    message?: string;
    resumeUrl?: string;
    error?: string;
  };
  success: boolean;
}

class ResumeApi {
  static async uploadResume(data: File): Promise<ResumeResponse> {
    const payload = {
      resume: data,
    };

    return post("/resume/upload", payload);
  }
}

export default ResumeApi;
