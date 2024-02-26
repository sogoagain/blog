import React from "react";

import { waitFor } from "@testing-library/react";

import { useStaticQuery } from "gatsby";

import { render, screen } from "../testUtils";

import TranslationsPage from "./translations";

import SITE_QUERY from "../__fixtures__/siteQuery";
import TRANSLATION_LIST_QUERY from "../__fixtures__/translationListQuery";

describe("<TranslationsPage/>", () => {
  beforeEach(() => {
    useStaticQuery.mockReturnValue({
      ...SITE_QUERY,
      allTranslationsJson: {
        ...TRANSLATION_LIST_QUERY.allTranslationsJson,
      },
    });

    render(<TranslationsPage location={{ pathname: "/" }} />);
  });

  it("SEO를 적용한다", async () => {
    await waitFor(() => expect(document.title).toBe("번역 · SOGOAGAIN"));
  });

  it("header를 출력한다", () => {
    const titleEl = screen.getByText("포스트");
    const noteEl = screen.getByText("노트");
    const aboutEl = screen.getByText("소개");

    expect(titleEl).toBeInTheDocument();
    expect(noteEl).toBeInTheDocument();
    expect(aboutEl).toBeInTheDocument();
  });

  it("번역글 목록을 출력한다", () => {
    const items = screen.getAllByRole("listitem");

    expect(items).toHaveLength(
      TRANSLATION_LIST_QUERY.allTranslationsJson.nodes.length,
    );
  });

  it("번역글 링크를 출력한다", () => {
    const linkEl = screen.getByRole("link", {
      name: "일과 저축은 혁명적인 행동이다",
    });

    expect(linkEl).toHaveAttribute(
      "href",
      "https://nakamotoinstitute.org/mempool/working-and-saving-are-revolutionary-acts/ko/",
    );
  });

  it("footer를 출력한다", () => {
    const goTopEl = screen.getByText("↑ 처음으로");

    expect(goTopEl).toBeInTheDocument();
  });
});
