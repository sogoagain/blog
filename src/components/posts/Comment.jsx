import React, { createRef, useEffect } from "react";

export default function Comment({ utterances }) {
  const ref = createRef();

  useEffect(() => {
    const scriptEl = document.createElement("script");
    Object.entries(utterances).forEach(([key, value]) => {
      scriptEl.setAttribute(key, value);
    });
    ref.current.appendChild(scriptEl);
  }, []);

  return <div data-testid="utterances" ref={ref} />;
}
