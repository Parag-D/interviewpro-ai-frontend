const Player = ({ srcBlob }: { srcBlob: Blob | null }) => {
  if (!srcBlob) {
    return null;
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
