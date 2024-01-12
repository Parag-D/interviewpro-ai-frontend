"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";

const Instructions = () => {
  const router = useRouter();

  function proceedToInterview() {
    router.push("/interview");
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-3xl p-8 rounded shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Interview Instructions</h2>
        <p className="text-gray-300 mb-6">Follow the guidelines below.</p>

        <div>
          <p className="text-gray-300 mb-6">
            The video assessment consists of 12-13 questions and is expected to
            take around 30 minutes to complete, depending on the number of
            assigned questions. Ensure that you complete the assessment in a
            single session. Upon receiving each question, a timer will start.
            You will have a preparation period until the question is read by our
            AI model. After the question is presented, the timer will begin,
            indicating the time limit to complete your response. Keep an eye on
            the timer during both the preparation and recording phases. If you
            finish your response before the time limit, you have the option to
            proceed to the next question early. Please be aware that the order
            and content of questions may be adjusted to showcase your natural
            and spontaneous responses during the video interview.
          </p>

          <h3 className="text-lg font-semibold mb-4">
            Equipment/Environment Check:
          </h3>
          <ul className="list-disc ml-6 mb-6">
            <li>
              Find a quiet space with ample lighting and a stable WiFi
              connection for the assessment.
            </li>
            <li>
              The interview recording feature is currently compatible with
              Chrome and Firefox. Make sure you are using one of these browsers.
            </li>
            <li>
              To proceed, grant access to your video camera and microphone.
            </li>
            <li>
              Position yourself appropriately within the screen frame, maintain
              an upright posture, and look directly into the camera when
              delivering your responses.
            </li>
          </ul>
        </div>

        <Button onClick={proceedToInterview}>Proceed to Interview</Button>
      </div>
    </div>
  );
};

export default Instructions;
