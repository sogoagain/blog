import React from "react";

import { render, screen } from "@testing-library/react";

import Header from "./Header";

describe("<Header/>", () => {
  const title = "Sogoagain 블로그";

  beforeEach(() => {
    render(<Header title={title} />);
  });

  it("블로그 제목을 출력한다", () => {
    const titleEl = screen.getByText(title);

    expect(titleEl).toBeInTheDocument();
  });
});
