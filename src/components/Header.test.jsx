import React from "react";

import { render, screen } from "@testing-library/react";

import Header from "./Header";

describe("<Header/>", () => {
  const title = "Sogoagain 블로그";
  const profileImage = {
    alt: "Sogoagain의 Github 프로필 이미지",
    src: "https://avatars.githubusercontent.com/u/23417465?v=4",
  };

  beforeEach(() => {
    render(<Header title={title} profileImage={profileImage} />);
  });

  it("블로그 제목을 출력한다", () => {
    const titleEl = screen.getByText(title);

    expect(titleEl).toBeInTheDocument();
  });

  it("프로필 이미지를 출력한다", () => {
    const imageEl = screen.getByAltText(profileImage.alt);

    expect(imageEl).toHaveAttribute("src", profileImage.src);
  });
});
