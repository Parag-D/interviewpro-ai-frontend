import useTimer from "@/hooks/useTimer";
import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import TextStreaming from "../ui/text-streaming";
import { useRouter } from "next/navigation";
import { QuestionsArray } from "@/types/interview";

function LiveStreamPreview({
  stream,
  data,
  status,
  timer, // in seconds
  onInterviewEnd,
}: {
  stream: MediaStream | null;
  data: QuestionsArray;
  status: string;
  timer: number;
  onInterviewEnd: () => void;
}) {
  const router = useRouter();

  const videoPreviewRef = useRef<HTMLVideoElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (videoPreviewRef.current && stream) {
      videoPreviewRef.current.srcObject = stream;
    } else if (videoPreviewRef.current) {
      videoPreviewRef.current.srcObject = null;
    }
  }, [stream]);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const { formattedTime, startTimer, isActive, restartTimer } = useTimer({
    initialSeconds: timer,
    onTimerEnd: () => {
      goToNextQuestion();
    },
  });

  const isLastQuestion = currentQuestionIndex === data.length - 1;
  const currentQuestion = data[currentQuestionIndex];

  function handleInterviewFinish() {
    onInterviewEnd();
    // TODO: save interview
    // router.replace("/interview/finish");
  }

  function goToNextQuestion() {
    if (isLastQuestion) {
      handleInterviewFinish();
    } else {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      const newQuestion = data[currentQuestionIndex + 1];
      console.log(audioRef?.current, newQuestion.audio_url);
      if (audioRef?.current) {
        audioRef.current.src = newQuestion.audio_url;
        // audioRef.current.play();
      }
      restartTimer();
    }
  }

  //   console.log(status);

  if (status === "failed") {
    return (
      <div className="grid place-content-center relative">
        <h1 className="text-center text-red-400 max-w-96 my-10">
          To proceed with the interview process, we need access to your camera
          and microphone.
        </h1>

        <Button
          onClick={() => window.location.reload()}
          className="w-40 mx-auto"
        >
          Retry
        </Button>
      </div>
    );
  }

  if (!stream) {
    return null;
  }

  return (
    <>
      <div className="grid place-content-center relative">
        <video
          ref={videoPreviewRef}
          width={700}
          height={480}
          autoPlay
          muted
          className="rounded-lg mx-auto"
        />
        <div className="text-center mt-5 flex justify-center">
          <p className="max-w-[50%] text-left">{currentQuestion.title}</p>
          {/* <TextStreaming text={currentQuestion.question} /> */}

          <audio
            ref={audioRef}
            src={currentQuestion.audio_url}
            autoPlay
            onEnded={startTimer}
          />
        </div>
      </div>
      <div className="flex justify-between items-center">
        <div
          className={`${
            isActive ? "border-green-400" : "border-yellow-400"
          } border-2 inline-block px-5 py-2 rounded-xl mt-5`}
        >
          {formattedTime()}
        </div>

        <div>
          <Button onClick={goToNextQuestion}>
            {isLastQuestion ? "Finish" : "Next Question"}
          </Button>
        </div>
      </div>
    </>
  );
}

export default LiveStreamPreview;
