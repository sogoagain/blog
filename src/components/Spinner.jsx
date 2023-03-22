import React, { useState, useEffect } from "react";

export default function Spinner({ loadingText = "불러오는 중" }) {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prevDots) => (prevDots.length < 3 ? `${prevDots}.` : ""));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <code>{loadingText + dots}</code>
    </div>
  );
}
