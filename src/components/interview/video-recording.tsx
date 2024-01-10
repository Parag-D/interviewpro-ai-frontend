"use client";
import useMediaRecorder from "@wmik/use-media-recorder";
import Player from "./player";
import LiveStreamPreview from "./live-stream";
import { useEffect } from "react";

const ScreenRecorderApp = () => {
  let {
    error,
    status,
    mediaBlob,
    stopRecording,
    getMediaStream,
    startRecording,
    liveStream,
  } = useMediaRecorder({
    // recordScreen: true,
    blobOptions: { type: "video/webm" },
    mediaStreamConstraints: { audio: true, video: true },
  });

  useEffect(() => {
    startRecording();
  }, []);

  // console.log(status);

  return (
    <article>
      {/* <h1>Screen recorder</h1> */}
      {/* {error ? `${status} ${error.message}` : status} */}
      <section>
        {/* <button
          type="button"
          onClick={getMediaStream}
          disabled={status === "ready"}
        >
          Start Video
        </button>
        <button
          type="button"
          onClick={startRecording}
          disabled={status === "recording"}
        >
          Start recording
        </button>
        <button
          type="button"
          onClick={stopRecording}
          disabled={status !== "recording"}
        >
          Stop recording
        </button> */}
      </section>
      <LiveStreamPreview
        status={status}
        stream={liveStream}
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
