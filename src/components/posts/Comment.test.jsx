import React from "react";

import { render, screen } from "@testing-library/react";

import Comment from "./Comment";

describe("<Comment/>", () => {
  const giscus = {
    repo: "sogoagain/blog",
    repoId: "R_kgDOGyvI0A",
    category: "Comments",
    categoryId: "DIC_kwDOGyvI0M4CcoSF",
    mapping: "pathname",
    theme: "preferred_color_scheme",
  };

  beforeEach(() => {
    render(<Comment giscus={giscus} />);
  });

  it("giscus 댓글 컴포넌트를 출력한다", () => {
    const commentEl = screen.getByText("댓글입니다");

    expect(commentEl).toBeInTheDocument();
  });
});
