import React from "react";

import { useStaticQuery } from "gatsby";

import { waitFor } from "@testing-library/react";

import { render, screen } from "../testUtils";

import PostsContainer from "./PostsContainer";

import POST_LIST from "../__fixtures__/postList";

describe("PostsContainer", () => {
  beforeEach(() => {
    useStaticQuery.mockReturnValue(POST_LIST);

    render(<PostsContainer />);
  });

  it("포스트 목록을 출력한다", async () => {
    await waitFor(() => {
      const items = screen.getAllByRole("listitem");

      expect(items).toHaveLength(POST_LIST.allMarkdownRemark.nodes.length);
    });
  });

  it("포스트 링크를 출력한다", async () => {
    await waitFor(() => {
      const linkEl = screen.getAllByRole("listitem")[0].firstChild;

      expect(linkEl.closest("a")).toHaveAttribute(
        "href",
        "/posts/2021/doubling-ratio/"
      );
    });
  });
});