import React from "react";

import { waitFor } from "@testing-library/react";

import { useStaticQuery } from "gatsby";

import { render, screen } from "../testUtils";

import AboutPage from "./about";

import SITE_QUERY from "../__fixtures__/siteQuery";
import PROJECTS_QUERY from "../__fixtures__/projectsQuery";

describe("<ProjectsPage/>", () => {
  beforeEach(() => {
    useStaticQuery.mockReturnValue({
      ...SITE_QUERY,
    });

    render(<AboutPage data={PROJECTS_QUERY} location={{ pathname: "/" }} />);
  });

  it("SEO를 적용한다", async () => {
    await waitFor(() => expect(document.title).toBe("프로젝트 · SOGOAGAIN"));
  });

  it("header를 출력한다", () => {
    const titleEl = screen.getByText("홈");
    const bitcoinEl = screen.getByText("비트코인");

    expect(titleEl).toBeInTheDocument();
    expect(bitcoinEl).toBeInTheDocument();
  });

  it("프로젝트 내용을 출력한다", () => {
    const aboutEl = screen.getByText("안녕하세요");

    expect(aboutEl).toBeInTheDocument();
  });

  it("footer를 출력한다", () => {
    const goTopEl = screen.getByText("↑ 처음으로");

    expect(goTopEl).toBeInTheDocument();
  });
});
