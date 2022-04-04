import React from "react";

import { render, screen } from "@testing-library/react";

import Footer from "./Footer";

describe("<Footer/>", () => {
  const title = "SOGOAGAIN";

  beforeEach(() => {
    render(<Footer title={title} />);
  });

  it("블로그 제작 정보를 출력한다", () => {
    const year = new Date().getFullYear();
    const copyrightEl = screen.getByText(`${title} ©${year}`);

    expect(copyrightEl).toBeInTheDocument();
  });
});
