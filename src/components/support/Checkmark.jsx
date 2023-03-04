import React, { useState, useEffect } from "react";

export default function Checkmark({ duration, size, color }) {
  const [pathLength, setPathLength] = useState(0);

  useEffect(() => {
    let animationFrame;
    let start;
    const step = (timestamp) => {
      if (!start) {
        start = timestamp;
      }
      const progress = timestamp - start;
      setPathLength((progress / duration) * 100);
      if (progress < duration) {
        animationFrame = requestAnimationFrame(step);
      }
    };
    animationFrame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrame);
  }, [duration]);

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5 25 L20 40 L45 15"
        stroke={color}
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="100"
        strokeDashoffset={100 - pathLength}
      />
    </svg>
  );
}
