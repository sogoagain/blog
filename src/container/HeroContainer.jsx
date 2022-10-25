import React from "react";

import Hero from "../components/sections/Hero";

import useScrambleTexts from "../hooks/useScrambleTexts";

export default function HeroContainer() {
  const scrambledText = useScrambleTexts([
    "Software",
    "Developer",
    "Engineering",
    "Test Driven Development",
    "Agile",
    "eXtreme Programming",
    "Bitcoin",
    "Decentralization",
    "Web",
  ]);

  return <Hero text={scrambledText} />;
}
