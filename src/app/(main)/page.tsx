"use client";

import dynamic from "next/dynamic";
import { useState } from "react";

// import Dropzone from "@/components/upload/dropzone";
const Dropzone = dynamic(() => import("@/components/upload/dropzone"), {
  ssr: false,
});

const HomePage = () => {
  // const [resumeFile, setResumeFile] = useState<File | null>(null);

  return (
    <div>
      <Dropzone
        onDrop={(files) => {
          console.log(files);
        }}
        accept={{
          "application/pdf": [],
        }}
      />
    </div>
  );
};

export default HomePage;
