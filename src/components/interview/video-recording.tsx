"use client";
import useMediaRecorder from "@wmik/use-media-recorder";
import Player from "./player";

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

  console.log(mediaBlob);

  return (
    <article>
      {/* <h1>Screen recorder</h1> */}
      {/* {error ? `${status} ${error.message}` : status} */}
      <section>
        <button
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
        </button>
      </section>

      <Player srcBlob={mediaBlob} audio={false} />
    </article>
  );
};

export default ScreenRecorderApp;
