import React from "react";

import { render, screen } from "@testing-library/react";

import Comment from "./Comment";

describe("<Comment/>", () => {
  const utterances = {
    src: "https://utteranc.es/client.js",
    repo: "sogoagain/blog-comments",
    "issue-term": "pathname",
    label: "comment",
    theme: "github-light",
    crossorigin: "anonymous",
    async: true,
  };

  beforeEach(() => {
    render(<Comment utterances={utterances} />);
  });

  it("utterances 스크립트 태그를 출력한다", () => {
    const scriptEl = screen.getByTestId("utterances");

    expect(scriptEl).toBeInTheDocument();
  });
});
