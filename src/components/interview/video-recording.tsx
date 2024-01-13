"use client";
import useMediaRecorder from "@wmik/use-media-recorder";
import Player from "./player";
import LiveStreamPreview from "./live-stream";
import { useEffect } from "react";
import InterviewApi from "@/api/interview";
import useInterviewStore from "@/store/interview";

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

  const { questions } = useInterviewStore();

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
