"use client";
import useMediaRecorder from "@wmik/use-media-recorder";
import Player from "./player";
import LiveStreamPreview from "./live-stream";
import { useEffect } from "react";
import InterviewApi from "@/api/interview";

const ScreenRecorderApp = () => {
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

  function onInterviewEnd() {
    stopRecording();
    clearMediaStream();

    // await InterviewApi.sendVideo(mediaBlob);
  }

  return (
    <article>
      <LiveStreamPreview
        status={status}
        stream={liveStream}
        onInterviewEnd={onInterviewEnd}
        data={[
          {
            _id: "1",
            question:
              "This version simulates the typing effect by gradually adding characters to the displayed message. Adjust the interval value in the setInterval function to control the speed of the typing animation.",
            audio: "/audio/audio1.mp3",
          },
          {
            _id: "2",
            question: "What is importance of your life2?",
            audio: "/audio/audio1.mp3",
          },
          {
            _id: "3",
            question: "What is importance of your life3?",
            audio: "/audio/audio1.mp3",
          },
        ]}
        timer={180}
      />

      {/* <Player srcBlob={mediaBlob} audio={false} /> */}
    </article>
  );
};

export default ScreenRecorderApp;
