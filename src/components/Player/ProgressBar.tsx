import useAudioPlayer from "@/hooks/useAudioPlayer";
import { MouseEvent, useEffect, useRef, useState } from "react";

const ProgressBar = () => {
  const {
    audio,
    currentTime = 0,
    duration = 0,
    setClickedTime,
  } = useAudioPlayer();

  const progress = useRef<HTMLDivElement>(null);
  const thumb = useRef<HTMLButtonElement>(null);
  const [percentage, setPercentage] = useState<any>(0);
  const [thumbPosition, setThumbPosition] = useState<number | undefined>();

  useEffect(() => {
    setPercentage(
      currentTime && duration > 0 ? (currentTime / duration) * 100 : 0,
    );
  }, [currentTime, duration]);

  const getClickedTime = (event: any) => {
    if (progress.current && duration) {
      const pageClickPosition = event.pageX;
      const barStart =
        progress.current.getBoundingClientRect().left + window.scrollX;
      const barWidth = progress.current.offsetWidth;
      const barClickPosition = pageClickPosition - barStart;
      const timePerPixel = duration / barWidth;

      return timePerPixel * barClickPosition;
    }

    return 0;
  };

  const onMouseDown = (event: MouseEvent) => {
    if (!audio.current) return;
    let clickedTime = getClickedTime(event);
    let percentage = (clickedTime / duration) * 100;
    setThumbPosition(percentage < 100 ? percentage : 100);

    const onMouseMove = (event: any) => {
      clickedTime = getClickedTime(event);
      percentage = (clickedTime / duration) * 100;
      setThumbPosition(percentage < 100 ? percentage : 100);
    };

    const onMouseUp = () => {
      setPercentage(percentage);
      setThumbPosition(undefined);
      setClickedTime(clickedTime);
      document.removeEventListener("mousemove", onMouseMove);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp, { once: true });
  };

  return (
    <div
      className="bar"
      style={{
        display: "flex",
        margin: "10px",
        padding: "10px 0",
        width: "500px",
        alignItems: "center",
      }}
    >
      <div
        onMouseDown={onMouseDown}
        ref={progress}
        className="bar__progress"
        style={{
          background: percentage
            ? `linear-gradient(to right, #5114ad ${
                thumbPosition ?? percentage
              }%, #999 0)`
            : "#999",

          borderRadius: "5px",
          margin: "2px 0 0",
          padding: "2px 0",
          display: "flex",
          alignItems: "center",
          width: "100%",
          transition: "0.1s ease-out",
        }}
      >
        <button
          ref={thumb}
          style={{
            background: "none",
            border: 0,
            position: "relative",
            left: `${thumbPosition ?? percentage}%`,

            transform: "translate3d(-6px,1px,0)",
            outline: "none",
          }}
        >
          <svg
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            fill="white"
            width={14}
          >
            <circle cx="50%" cy="50%" r="50%" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ProgressBar;
