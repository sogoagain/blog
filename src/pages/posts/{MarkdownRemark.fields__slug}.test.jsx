import React from "react";

import { waitFor } from "@testing-library/react";

import { useStaticQuery, navigate } from "gatsby";

import { render, screen } from "../../testUtils";

import PostPage from "./{MarkdownRemark.fields__slug}";

import POST_QUERY from "../../__fixtures__/postQuery";
import SITE_QUERY from "../../__fixtures__/siteQuery";

describe("<PostPage/>", () => {
  beforeEach(() => {
    useStaticQuery.mockReturnValue({
      ...SITE_QUERY,
    });
  });

  context("포스트가 존재한다면", () => {
    beforeEach(() => {
      render(
        <PostPage
          data={POST_QUERY}
          location={{ pathname: "/posts/2017/leblancs-law/" }}
        />,
      );
    });

    it("SEO를 적용한다", async () => {
      await waitFor(() =>
        expect(document.title).toBe("르블랑의 법칙 · SOGOAGAIN"),
      );
    });

    it("header를 출력한다", () => {
      const titleEl = screen.getByText("홈");
      const bitcoinEl = screen.getByText("비트코인");
      const aboutEl = screen.getByText("소개");

      expect(titleEl).toBeInTheDocument();
      expect(bitcoinEl).toBeInTheDocument();
      expect(aboutEl).toBeInTheDocument();
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
        "나는 현재 충분히 아름다운 코드를 짜고 있는가?",
      );
    });

    it("footer를 출력한다", () => {
      const goTopEl = screen.getByText("↑ 처음으로");

      expect(goTopEl).toBeInTheDocument();
    });
  });

  context("포스트가 존재하지 않는다면", () => {
    beforeEach(() => {
      navigate.mockClear();

      render(
        <PostPage
          data={{ markdownRemark: null }}
          location={{ pathname: "/posts/2017/leblancs-law/" }}
        />,
      );
    });

    it("404 페이지로 이동한다", () => {
      expect(navigate).toHaveBeenCalledWith("/404");
    });
  });
});
