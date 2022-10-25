import { useState, useEffect, useRef } from "react";

import { shuffleArray } from "../utils";

export default function useScrambleTexts(texts) {
  const [queue, setQueue] = useState(shuffleArray([...texts]));
  const [index, setIndex] = useState(0);
  const [scrambledText, setScrambledText] = useState(queue[index]);

  const scramblerRef = useRef(null);

  useEffect(async () => {
    if (!scramblerRef.current) {
      const initScrambler = async () => {
        const { default: Scrambler } = await import("scrambling-text");
        scramblerRef.current = new Scrambler();
      };
      await initScrambler();
    }

    scramblerRef.current.scramble(queue[index], setScrambledText, {
      characters: [
        ..."abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""),
        " ",
      ],
    });

    setTimeout(() => {
      if (index + 1 === queue.length) {
        setQueue(shuffleArray([...texts]));
        setIndex(0);
      } else {
        setIndex(index + 1);
      }
    }, 2500);
  }, [index]);

  return scrambledText;
}
