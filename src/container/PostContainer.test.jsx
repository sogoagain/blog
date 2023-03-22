import React from "react";

import { useStaticQuery } from "gatsby";

import { render, screen } from "../testUtils";

import PostContainer from "./PostContainer";

import POST_QUERY from "../__fixtures__/postQuery";
import SITE_QUERY from "../__fixtures__/siteQuery";

describe("<PostContainer/>", () => {
  beforeEach(() => {
    useStaticQuery.mockReturnValue({
      ...SITE_QUERY,
    });

    render(
      <PostContainer
        title={POST_QUERY.markdownRemark.frontmatter.title}
        subtitle={POST_QUERY.markdownRemark.frontmatter.subtitle}
        date={POST_QUERY.markdownRemark.frontmatter.date}
        html={POST_QUERY.markdownRemark.html}
      />
    );
  });

  it("포스트 제목을 출력한다", () => {
    const postTitleEl = screen.getByText("르블랑의 법칙");

    expect(postTitleEl).toBeInTheDocument();
  });

  it("포스트 부제목을 출력한다", () => {
    const subtitleEl = screen.getByText("나중은 결코 오지 않는다.");

    expect(subtitleEl).toBeInTheDocument();
  });

  it("포스트 작성 시간을 출력한다", () => {
    const dateEl = screen.getByText("2017-01-06");

    expect(dateEl).toBeInTheDocument();
  });

  it("포스트 내용을 출력한다", () => {
    const postBodyEl = screen.getByTestId("post-content-element");

    expect(postBodyEl).toHaveTextContent(
      "나는 현재 충분히 아름다운 코드를 짜고 있는가?"
    );
  });

  it("댓글을 출력한다", () => {
    const scriptEl = screen.getByTestId("utterances");

    expect(scriptEl).toBeInTheDocument();
  });
});
