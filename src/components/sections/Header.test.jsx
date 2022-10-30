import React from "react";

import { render, screen } from "@testing-library/react";

import Header from "./Header";

describe("<Header/>", () => {
  const title = {
    text: "sogoaogain 블로그",
    to: "/",
  };
  const aboutImageSrc = "https://avatars.githubusercontent.com/u/23417465?v=4";

  function renderHeader(aboutImage) {
    const links = {
      support: {
        link: "/support",
        title: "Support",
      },
      about: {
        link: "/about",
        image: aboutImage,
        title: "About",
      },
    };

    render(<Header title={title} links={links} />);
  }

  it("블로그 제목을 출력한다", () => {
    renderHeader(aboutImageSrc);

    const titleEl = screen.getByText(title.text);

    expect(titleEl).toBeInTheDocument();
    expect(titleEl).toHaveAttribute("href", title.to);
  });

  context("about.image가 없으면", () => {
    it("기본 프로필 이미지를 출력한다", () => {
      renderHeader(null);

      const aboutImageEl = screen.getByAltText("About");

      expect(aboutImageEl).toBeInTheDocument();
      expect(aboutImageEl.src).toEqual("http://localhost/test-file-stub");
    });
  });

  context("about.image가 있으면", () => {
    it("이미지를 출력한다", () => {
      renderHeader(aboutImageSrc);

      const aboutImageEl = screen.getByAltText("About");

      expect(aboutImageEl).toHaveAttribute("src", aboutImageSrc);
      expect(aboutImageEl.src).toEqual(
        "https://avatars.githubusercontent.com/u/23417465?v=4"
      );
    });
  });

  it("후원 페이지 링크를 출력한다", () => {
    renderHeader(aboutImageSrc);

    const supportImageEl = screen.getByAltText("Support");

    expect(supportImageEl.closest("a")).toHaveAttribute("href", "/support");
  });

  it("소개 페이지 링크를 출력한다", () => {
    renderHeader(aboutImageSrc);

    const aboutImageEl = screen.getByAltText("About");

    expect(aboutImageEl.closest("a")).toHaveAttribute("href", "/about");
  });
});
