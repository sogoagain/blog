import React from "react";

import { waitFor } from "@testing-library/react";

import { useStaticQuery } from "gatsby";

import { render, screen } from "../testUtils";

import PhotoPage from "./photos";

import SITE_QUERY from "../__fixtures__/siteQuery";
import PHOTO_LIST_QUERY from "../__fixtures__/photoListQuery";

describe("<PhotoPage/>", () => {
  beforeEach(() => {
    useStaticQuery.mockReturnValue({
      ...SITE_QUERY,
      allFile: {
        edges: [...PHOTO_LIST_QUERY.allFile.edges],
      },
    });

    render(<PhotoPage location={{ pathname: "/photos" }} />);
  });

  it("SEO를 적용한다", async () => {
    await waitFor(() => expect(document.title).toBe("사진 · SOGOAGAIN"));
  });

  it("header를 출력한다", () => {
    const photoEl = screen.queryByRole("link", { name: "사진" });
    const noteEl = screen.getByText("노트");
    const aboutEl = screen.getByText("소개");

    expect(photoEl).toBe(null);
    expect(noteEl).toBeInTheDocument();
    expect(aboutEl).toBeInTheDocument();
  });

  it("사진 목록을 출력한다", () => {
    const images = screen.getAllByAltText(/Image/);
    expect(images).toHaveLength(2);
    expect(images[0]).toHaveAttribute("src", "mocked-image-src.jpg");
    expect(images[0]).toHaveAttribute("alt", "Image 2");
    expect(images[1]).toHaveAttribute("src", "mocked-image-src.jpg");
    expect(images[1]).toHaveAttribute("alt", "Image 1");

    const image1TitleEl = screen.getByText("Image 1");
    const image1DateEl = screen.getByText("2024.08.16");
    const image1InfoEl = screen.getByText(
      "Nikon Z50 · NIKKOR Z DX 16-50mm f/3.5-6.3 VR · ISO100 · 50mm · F6.3 · 1/640s",
    );
    expect(image1TitleEl).toBeInTheDocument();
    expect(image1DateEl).toBeInTheDocument();
    expect(image1InfoEl).toBeInTheDocument();

    const image2TitleEl = screen.getByText("Image 2");
    const image2DateEl = screen.getByText("2024.08.17");
    const image2InfoEl = screen.getByText(
      "Canon EOS R · RF24-105mm F4-7.1 IS STM · ISO200 · 105mm · F7.1 · 1/800s",
    );
    expect(image2TitleEl).toBeInTheDocument();
    expect(image2DateEl).toBeInTheDocument();
    expect(image2InfoEl).toBeInTheDocument();
  });

  it("footer를 출력한다", () => {
    const goTopEl = screen.getByText("↑ 처음으로");

    expect(goTopEl).toBeInTheDocument();
  });
});
