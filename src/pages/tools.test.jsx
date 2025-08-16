import React from "react";

import { waitFor } from "@testing-library/react";

import { useStaticQuery } from "gatsby";

import { render, screen } from "../testUtils";

import ToolsPage from "./tools";

import SITE_QUERY from "../__fixtures__/siteQuery";
import TOOL_LIST_QUERY from "../__fixtures__/toolListQuery";

describe("<ToolsPage/>", () => {
  beforeEach(() => {
    useStaticQuery.mockReturnValue({
      ...SITE_QUERY,
      allToolsJson: {
        ...TOOL_LIST_QUERY.allToolsJson,
      },
    });

    render(<ToolsPage location={{ pathname: "/tools/" }} />);
  });

  it("SEO를 적용한다", async () => {
    await waitFor(() => expect(document.title).toBe("도구 · SOGOAGAIN"));
  });

  it("header를 출력한다", () => {
    const tool = screen.queryByRole("link", { name: "도구" });
    const postEl = screen.getByText("포스트");
    const noteEl = screen.getByText("노트");
    const aboutEl = screen.getByText("소개");

    expect(tool).toBe(null);
    expect(postEl).toBeInTheDocument();
    expect(noteEl).toBeInTheDocument();
    expect(aboutEl).toBeInTheDocument();
  });

  it("도구 목록을 출력한다", () => {
    const items = screen.getAllByRole("listitem");

    expect(items).toHaveLength(TOOL_LIST_QUERY.allToolsJson.nodes.length);
  });

  it("도구 링크를 출력한다", () => {
    const linkEl = screen.getByRole("link", {
      name: "도서 학술 출처 생성기",
    });

    expect(linkEl).toHaveAttribute("href", "https://book.sogoagain.com");
  });

  it("footer를 출력한다", () => {
    const goTopEl = screen.getByText("↑ 처음으로");

    expect(goTopEl).toBeInTheDocument();
  });
});
