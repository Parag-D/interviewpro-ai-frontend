import { useState, useEffect, useMemo, useLayoutEffect, useRef } from "react";

const TextStreaming = ({ text }: { text: string }) => {
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const textRef = useRef<HTMLDivElement>(null);

  const showText = useMemo(() => {
    return text.substring(0, currentCharIndex);
  }, [currentCharIndex, text]);

  const animate = () => {
    if (currentCharIndex < text.length) {
      setCurrentCharIndex((prev) => prev + 1);
      requestAnimationFrame(animate);
    }
  };

  useLayoutEffect(() => {
    if (!textRef.current) {
      return;
    }

    setDimensions({
      width: textRef.current.offsetWidth,
      height: textRef.current.offsetHeight,
    });
  }, [showText]);

  useEffect(() => {
    requestAnimationFrame(animate);

    return () => {
      setCurrentCharIndex(0);
    };
  }, [text]);

  return (
    <>
      <div ref={textRef} className="max-w-[60%] text-left">
        <span>{showText}</span>
      </div>
    </>
  );
};

export default TextStreaming;
