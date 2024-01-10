const Player = ({
  srcBlob,
  audio,
}: {
  srcBlob: Blob | null;
  audio: boolean;
}) => {
  if (!srcBlob) {
    return null;
  }

  if (audio) {
    return <audio src={URL.createObjectURL(srcBlob)} controls />;
  }

  return (
    <video
      src={URL.createObjectURL(srcBlob)}
      width={520}
      height={480}
      controls
    />
  );
};

export default Player;
