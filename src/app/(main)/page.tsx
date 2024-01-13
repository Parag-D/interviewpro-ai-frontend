"use client";

import ResumeApi from "@/api/resume";
import { Button } from "@/components/ui/button";
import useInterviewStore from "@/store/interview";
import { Loader2Icon, LoaderIcon } from "lucide-react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

// import Dropzone from "@/components/upload/dropzone";
const Dropzone = dynamic(() => import("@/components/upload/dropzone"), {
  ssr: false,
});

const HomePage = () => {
  const router = useRouter();
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { questions, setQuestionId, setQuestions } = useInterviewStore();

  async function handleUploadResume() {
    if (!resumeFile) {
      return;
    }

    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("resume", resumeFile);

      const response = await ResumeApi.uploadResume(formData);
      if (response.success) {
        toast.success("Resume uploaded successfully");
        setQuestionId(response.data.questionId);
        setQuestions(response.data.questions);
        router.push("/interview/instructions");
        return;
      }
      if (response.name === "AxiosError") {
        toast.error("Failed to upload resume");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to upload resume");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="px-20">
      <h1 className="text-center text-lg my-10">
        Upload your resume, to start the interview process
      </h1>
      <Dropzone
        onDrop={(files) => {
          if (files?.length > 0) {
            setResumeFile(files[0]);
          }
        }}
        accept={{
          "application/pdf": [],
        }}
      />

      <div className="flex justify-center mt-10">
        {resumeFile && (
          <Button onClick={handleUploadResume} disabled={isLoading}>
            Upload Resume
          </Button>
        )}
      </div>

      {isLoading && (
        <div className="flex justify-center mt-10">
          <LoaderIcon className="h-5 w-5 animate-spin mr-5" /> We are analysing
          your resume. Please wait for few moments.
        </div>
      )}
    </div>
  );
};

export default HomePage;
