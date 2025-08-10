import { useState, useEffect, useRef } from "react";
import { shuffleArray } from "../utils";

export default function useScrambleTexts(texts) {
  const [queue, setQueue] = useState(shuffleArray([...texts]));
  const [index, setIndex] = useState(0);
  const [scrambledText, setScrambledText] = useState(queue[index]);

  const scramblerRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    let isMounted = true;

    const scramble = async () => {
      if (!scramblerRef.current) {
        const { default: Scrambler } = await import("scrambling-text");
        scramblerRef.current = new Scrambler();
      }

      scramblerRef.current.scramble(
        queue[index],
        (text) => {
          if (isMounted) {
            setScrambledText(text);
          }
        },
        {
          characters:
            "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""),
        },
      );
    };

    scramble();

    timeoutRef.current = setTimeout(() => {
      if (isMounted && index + 1 === queue.length) {
        setQueue(shuffleArray([...texts]));
        setIndex(0);
      } else {
        setIndex(index + 1);
      }
    }, 3000);

    return () => {
      isMounted = false;
      clearTimeout(timeoutRef.current);
    };
  }, [index]);

  return scrambledText;
}
