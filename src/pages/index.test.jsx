import React from "react";

import { waitFor } from "@testing-library/react";

import { useStaticQuery } from "gatsby";

import { render, screen } from "../testUtils";

import IndexPage from "./index";

import SITE_QUERY from "../__fixtures__/siteQuery";
import POST_LIST_QUERY from "../__fixtures__/postListQuery";

describe("<IndexPage/>", () => {
  beforeEach(() => {
    useStaticQuery.mockReturnValue({
      ...SITE_QUERY,
      ...POST_LIST_QUERY,
    });

    render(<IndexPage location={{ pathname: "/" }} />);
  });

  it("SEO를 적용한다", async () => {
    await waitFor(() => expect(document.title).toBe("SOGOAGAIN 블로그"));
  });

  it("header를 출력한다", () => {
    const titleEl = screen.getByText("홈");
    const bitcoinEl = screen.getByText("비트코인");
    const aboutEl = screen.getByText("소개");

    expect(titleEl).toBeInTheDocument();
    expect(bitcoinEl).toBeInTheDocument();
    expect(aboutEl).toBeInTheDocument();
  });

  it("관심사 Hero를 출력한다", () => {
    const interest = screen.getByText(
      SITE_QUERY.site.siteMetadata.interests[0]
    );

    expect(interest).toBeInTheDocument();
  });

  it("포스트 목록을 출력한다", () => {
    const items = screen.getAllByRole("listitem");

    expect(items).toHaveLength(POST_LIST_QUERY.allMarkdownRemark.nodes.length);
  });

  it("포스트 링크를 출력한다", () => {
    const linkEl = screen.getByRole("link", {
      name: "더블링 테스트, 알고리즘 복잡도를 실험으로 예측하는 방법",
    });

    expect(linkEl).toHaveAttribute("href", "/posts/2021/doubling-ratio/");
  });

  it("footer를 출력한다", () => {
    const goTopEl = screen.getByText("↑ 처음으로");

    expect(goTopEl).toBeInTheDocument();
  });
});
