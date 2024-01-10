import ScreenRecorderApp from "@/components/interview/video-recording";

const Interview = () => {
  const question1 = "How do you use react?";
  const audio1 = "audio1";

  return (
    <div className="px-20">
      <h1 className="text-center text-3xl font-bold">Interview</h1>
      <ScreenRecorderApp />
    </div>
  );
};

export default Interview;
