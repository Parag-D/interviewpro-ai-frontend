"use client";

import ResumeApi from "@/api/resume";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";
import { useState } from "react";
import { toast } from "sonner";

// import Dropzone from "@/components/upload/dropzone";
const Dropzone = dynamic(() => import("@/components/upload/dropzone"), {
  ssr: false,
});

const HomePage = () => {
  const [resumeFile, setResumeFile] = useState<File | null>(null);

  async function handleUploadResume() {
    if (!resumeFile) {
      return;
    }

    try {
      const response = await ResumeApi.uploadResume(resumeFile);
      if (response.success) {
        toast.success("Resume uploaded successfully");
      }
      if (response.name === "AxiosError") {
        toast.error("Failed to upload resume");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to upload resume");
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
          <Button onClick={handleUploadResume}>Upload Resume</Button>
        )}
      </div>
    </div>
  );
};

export default HomePage;
