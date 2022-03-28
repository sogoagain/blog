import React from "react";

import { render, screen } from "@testing-library/react";

import Header from "./Header";

describe("<Header/>", () => {
  const title = "sogoagain 블로그";
  const profileImage = {
    alt: "sogoagain의 Github 프로필 이미지",
    src: "https://avatars.githubusercontent.com/u/23417465?v=4",
  };
  const about = {
    to: "/about",
    title: "소개",
  };

  beforeEach(() => {
    render(<Header title={title} profileImage={profileImage} about={about} />);
  });

  it("블로그 제목을 출력한다", () => {
    const titleEl = screen.getByText(title);

    expect(titleEl).toBeInTheDocument();
  });

  it("프로필 이미지를 출력한다", () => {
    const imageEl = screen.getByAltText(profileImage.alt);

    expect(imageEl).toHaveAttribute("src", profileImage.src);
  });

  it("소개 페이지 링크를 출력한다", () => {
    const aboutEl = screen.getByText(about.title);

    expect(aboutEl).toHaveAttribute("href", about.to);
  });
});
