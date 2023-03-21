import React from "react";

import { waitFor } from "@testing-library/react";

import { useStaticQuery } from "gatsby";

import { render, screen } from "../testUtils";

import NotFoundPage from "./404";

import SITE_QUERY from "../__fixtures__/siteQuery";
import POST_LIST_QUERY from "../__fixtures__/postListQuery";

describe("NotFoundPage", () => {
  beforeEach(() => {
    useStaticQuery.mockReturnValue({
      ...SITE_QUERY,
      ...POST_LIST_QUERY,
    });

    render(<NotFoundPage location={{ pathname: "/404" }} />);
  });

  it("SEO를 적용한다", async () => {
    await waitFor(() => expect(document.title).toBe("404 · SOGOAGAIN"));
  });

  it("페이지 제목을 표기한다", () => {
    const titleEl = screen.getByText("페이지를 찾을 수 없습니다");

    expect(titleEl).toBeInTheDocument();
  });

  it("홈으로 돌아가기 버튼을 제공한다", () => {
    const linkEl = screen.getByText("돌아가기");

    expect(linkEl).toHaveAttribute("href", "/");
  });
});
