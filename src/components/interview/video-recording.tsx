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
        const s3Url = response.data.url || "";

        const headers = {
          "Content-Type": "video/webm", // Adjust based on your video type
          "Content-Length": "100" || mediaBlob?.size.toString(),
        };

        fetch(s3Url, {
          method: "PUT",
          headers: headers,
          body: mediaBlob,
        })
          .then((response) => {
            console.log(response);
            if (!response.ok) {
              throw new Error("Failed to upload video");
            }
          })
          .catch((error) => {
            console.error("Error uploading video:", error);
          });

        // if (s3Url) {
        //   const res = await axios.put(s3Url, mediaBlob, {
        //     headers,
        //   });
        //   console.log(res);
        // }
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
