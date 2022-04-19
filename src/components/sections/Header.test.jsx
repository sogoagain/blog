import React from "react";

import { render, screen } from "@testing-library/react";

import Header from "./Header";

describe("<Header/>", () => {
  const title = {
    text: "sogoaogain 블로그",
    to: "/",
  };
  const profileImage = {
    alt: "프로필 이미지",
    src: "https://avatars.githubusercontent.com/u/23417465?v=4",
  };
  const about = {
    text: "소개",
    href: "https://sogoagain.notion.site/About-599f1c0b47314c30800c706265b0a7bd",
  };

  function renderHeader(imageSrc) {
    render(
      <Header
        title={title}
        profileImage={{ ...profileImage, src: imageSrc }}
        about={about}
      />
    );
  }

  it("블로그 제목을 출력한다", () => {
    renderHeader(profileImage.src);

    const titleEl = screen.getByText(title.text);

    expect(titleEl).toBeInTheDocument();
    expect(titleEl).toHaveAttribute("href", title.to);
  });

  context("프로필 이미지 src가 없으면", () => {
    it("이미지를 출력하지 않는다", () => {
      renderHeader(null);

      const imageEl = screen.queryByAltText(profileImage.alt);

      expect(imageEl).not.toBeInTheDocument();
    });
  });

  context("프로필 이미지 src가 있으면", () => {
    it("프로필 이미지를 출력한다", () => {
      renderHeader(profileImage.src);

      const imageEl = screen.getByAltText(profileImage.alt);

      expect(imageEl).toHaveAttribute("src", profileImage.src);
    });
  });

  it("소개 페이지 링크를 출력한다", () => {
    renderHeader(profileImage.src);

    const aboutEl = screen.getByText(about.text);

    expect(aboutEl.closest("a")).toHaveAttribute("href", about.to);
  });
});
