import { useState, useEffect } from "react";

export default function useScrambleText(text) {
  const [scrambledText, setScrambledText] = useState(text);

  useEffect(() => {
    const initScrambleTitle = async () => {
      const { default: Scrambler } = await import("scrambling-text");
      const scrambler = new Scrambler();
      scrambler.scramble(text, setScrambledText, {
        characters: "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""),
      });
    };
    initScrambleTitle();
  }, []);

  return scrambledText;
}
