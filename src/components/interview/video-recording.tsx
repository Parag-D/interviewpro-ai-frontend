"use client";
import useMediaRecorder from "@wmik/use-media-recorder";
import Player from "./player";
import LiveStreamPreview from "./live-stream";
import { useEffect, useState } from "react";
import InterviewApi from "@/api/interview";
import useInterviewStore from "@/store/interview";

const VIDEO_PROCESSING_TIME = 1.5 * 60 * 1000;

const ScreenRecorderApp = () => {
  const { questionId, questions, setFeedback } = useInterviewStore();
  const [polling, setPolling] = useState(false);

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

  const onInterviewEnd = async () => {
    stopRecording();
    // clearMediaStream();
  };

  const sendVideo = async (mediaBlob: Blob) => {
    try {
      const response = await InterviewApi.sendVideo(questionId);
      const audioBlob = new Blob([mediaBlob], { type: "audio/wav" });

      // Now you can do something with the extracted audioBlob
      console.log(audioBlob);

      if (response.success) {
        const s3Url = response.data.video_url || "";

        const headers = {
          "Content-Type": "video/webm", // Adjust based on your video type
          "Content-Length": "100" || mediaBlob?.size.toString(),
        };

        setTimeout(() => {
          console.log(mediaBlob, "mediaBlob");
          if (s3Url) {
            fetch(s3Url, {
              method: "PUT",
              headers: headers,
              body: mediaBlob,
            })
              .then((response) => {
                console.log(response);

                if (!response.ok) {
                  throw new Error("Failed to upload video");
                } else {
                  setTimeout(() => {
                    getAnalytics();
                  }, VIDEO_PROCESSING_TIME);
                }
              })
              .catch((error) => {
                console.error("Error uploading video:", error);
              });
          }
        }, 1000);
        // const res =  axios.put(s3Url, mediaBlob, {
        //   headers,
        // });
        // console.log(res);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAnalytics = async () => {
    setPolling(true);
    try {
      const response = await InterviewApi.getAnalyticsByQuestionId(questionId);

      console.log(response.data);

      setFeedback(response.data.feedback);

      if (response.data.success) {
        setPolling(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (status === "stopped") {
      console.log(mediaBlob);
      if (mediaBlob) {
        sendVideo(mediaBlob);
        // getAnalytics();
      }
    }
  }, [status, mediaBlob]);

  return (
    <article>
      <LiveStreamPreview
        status={status}
        stream={liveStream}
        onInterviewEnd={onInterviewEnd}
        data={questions}
        timer={10}
      />

      {/* <Player srcBlob={mediaBlob} /> */}
    </article>
  );
};

export default ScreenRecorderApp;
