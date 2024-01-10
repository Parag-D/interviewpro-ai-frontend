import ScreenRecorderApp from "@/components/interview/video-recording";

const Interview = () => {
  const question1 = "How do you use react?";
  const audio1 = "audio1";

  return (
    <div>
      {/* <h1>{question1}</h1>
      <audio controls>
        <source src={audio1} type="audio/mpeg" />
      </audio>

      <ScreenRecorderApp /> */}

      <h1>Interview</h1>
      <ScreenRecorderApp />
    </div>
  );
};

export default Interview;
