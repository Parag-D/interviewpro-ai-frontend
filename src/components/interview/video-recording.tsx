"use client";
import useMediaRecorder from "@wmik/use-media-recorder";
import Player from "./player";
import LiveStreamPreview from "./live-stream";
import { useEffect } from "react";
import InterviewApi from "@/api/interview";
import useInterviewStore from "@/store/interview";
import { toast } from "sonner";
import { post } from "@/api";
import axios from "axios";

const ScreenRecorderApp = () => {
  const { questionId, questions } = useInterviewStore();

  let {
    error,
    status,
    mediaBlob,
    stopRecording,
    getMediaStream,
    startRecording,
    liveStream,
    clearMediaStream,
  } = useMediaRecorder({
    // recordScreen: true,
    blobOptions: { type: "video/webm" },
    mediaStreamConstraints: { audio: true, video: true },
  });

  useEffect(() => {
    startRecording();
  }, []);

  async function onInterviewEnd() {
    stopRecording();
    clearMediaStream();

    try {
      const response = await InterviewApi.sendVideo(questionId);

      if (response.success) {
        const s3Url = response.data.url;

        const headers = {
          "Content-Type": "video/mp4", // Adjust based on your video type
          "Content-Length": mediaBlob?.size.toString(),
          "x-amz-acl": "public-read", // Optional: Adjust based on your requirements
          "x-amz-server-side-encryption": "AES256", // Optional: Enable server-side encryption
        };

        if (s3Url) {
          const res = await axios.put(s3Url, mediaBlob, {
            headers,
          });
          console.log(res);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <article>
      <LiveStreamPreview
        status={status}
        stream={liveStream}
        onInterviewEnd={onInterviewEnd}
        data={questions}
        timer={10}
      />

      <Player srcBlob={mediaBlob} audio={false} />
    </article>
  );
};

export default ScreenRecorderApp;
