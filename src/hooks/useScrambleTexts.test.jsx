import React from "react";

import { render, screen, waitFor } from "@testing-library/react";

import useScrambleTexts from "./useScrambleTexts";

const texts = ["Sofrware", "Agile"];

function Scramble() {
  const scrambledText = useScrambleTexts(texts);

  return <div>{scrambledText}</div>;
}

describe("useScrambleTexts", () => {
  beforeEach(() => {
    jest.useFakeTimers("legacy");
  });

  it("텍스트들을 랜덤 순서로 섞어서 출력한다", async () => {
    render(<Scramble />);

    await waitFor(
      () => expect(screen.getByText(texts[0])).toBeInTheDocument(),
      { timeout: 5000 }
    );
    await waitFor(
      () => expect(screen.getByText(texts[1])).toBeInTheDocument(),
      { timeout: 5000 }
    );
    await waitFor(
      () => expect(screen.getByText(texts[0])).toBeInTheDocument(),
      { timeout: 5000 }
    );
  });
});
