import React from "react";

import { waitFor } from "@testing-library/react";

import { useStaticQuery } from "gatsby";

import { render, screen, fireEvent } from "../testUtils";

import NotePage from "./notes";

import SITE_QUERY from "../__fixtures__/siteQuery";

describe("<NotePage/>", () => {
  beforeEach(() => {
    useStaticQuery.mockReturnValue({
      ...SITE_QUERY,
    });

    render(<NotePage data={SITE_QUERY} location={{ pathname: "/" }} />);
  });

  it("SEO를 적용한다", async () => {
    await waitFor(() => expect(document.title).toBe("노트 · SOGOAGAIN"));
  });

  it("header를 출력한다", () => {
    const titleEl = screen.getByText("홈");
    const aboutEl = screen.getByText("소개");

    expect(titleEl).toBeInTheDocument();
    expect(aboutEl).toBeInTheDocument();
  });

  it("사용자 상태를 출력한다", () => {
    const status = screen.getByText("일반 상태");

    expect(status).toBeInTheDocument();
  });

  it("해시태그 목록을 출력한다", () => {
    ["ZAPS", "NOTHING", "ETC"].forEach((hashtag) => {
      const hashtagEl = screen.getByText(hashtag);

      expect(hashtagEl).toBeInTheDocument();
    });
  });

  it("해시태그 목록이 노트 갯수를 기준으로 내림차순, 노트 갯수가 동일하면 한국어 기준 정렬되어 출력된다", () => {
    const labels = screen
      .getAllByText(/(BITCOIN|NOTHING|ZAPS|ETC|테스트)/)
      .map((label) => label.textContent)
      .filter((text) => !text.startsWith("#"));

    const sortedHashtags = ["ZAPS", "테스트", "BITCOIN", "NOTHING", "ETC"];

    expect(labels).toEqual(sortedHashtags);
  });

  it("노트 목록을 출력한다", () => {
    const note1 = screen.getByText("노트 1");
    const note1Date = screen.getByText("2023-12-24");

    const note2 = screen.getByText("노트 2");
    const note2Date = screen.getByText("2024-01-05");

    const note3 = screen.getByText("노트 3");
    const note3Date = screen.getByText("2024-01-06");

    expect(note1).toBeInTheDocument();
    expect(note1Date).toBeInTheDocument();

    expect(note2).toBeInTheDocument();
    expect(note2Date).toBeInTheDocument();

    expect(note3).toBeInTheDocument();
    expect(note3Date).toBeInTheDocument();
  });

  it("선택한 해시태그에 따라 노트를 필터링한다", () => {
    const hashtagEl = screen.getByText("NOTHING");
    fireEvent.click(hashtagEl);

    const items = screen.getAllByRole("listitem");
    const note1 = screen.getByText("노트 1");

    expect(items).toHaveLength(1);
    expect(note1).toBeInTheDocument();
  });

  it("해시태그 필터를 해제하면 모든 노트를 출력한다", () => {
    const hashtagEl = screen.getByText("NOTHING");
    fireEvent.click(hashtagEl);
    fireEvent.click(hashtagEl);

    const items = screen.getAllByRole("listitem");

    expect(items).toHaveLength(7);
  });

  it("ETC 해시태그 필터를 선택하면 태그가 없는 노트를 출력한다", () => {
    const hashtagEl = screen.getByText("ETC");
    fireEvent.click(hashtagEl);

    const items = screen.getAllByRole("listitem");
    const note3 = screen.getByText("노트 3");

    expect(items).toHaveLength(2);
    expect(note3).toBeInTheDocument();
  });

  it("노트에 포함된 이미지를 출력한다", () => {
    const img = screen.getByAltText("Nostr 노트에서 불러온 이미지");

    expect(img).toBeInTheDocument();
  });

  it("노트에 멘션된 프로필을 출력한다", () => {
    const mention = screen.getByText("@npub1zatgwjy");

    expect(mention).toBeInTheDocument();
  });

  it("인용된 노트를 출력한다", () => {
    const quotedNote = screen.getByText("note1l63ccvq...fqlef3q4");

    expect(quotedNote).toBeInTheDocument();
  });

  it("노트들을 출력한다", () => {
    const noteEls = screen.getAllByRole("listitem");

    expect(noteEls).toHaveLength(7);
  });

  it("footer를 출력한다", () => {
    const goTopEl = screen.getByText("↑ 처음으로");

    expect(goTopEl).toBeInTheDocument();
  });
});
