import React, { act } from "react";

import { waitFor } from "@testing-library/react";

import { useStaticQuery } from "gatsby";

import { render, screen, fireEvent } from "../testUtils";

import NotePage from "./notes";

import SITE_QUERY from "../__fixtures__/siteQuery";

describe("<NotePage/>", () => {
  beforeEach(async () => {
    useStaticQuery.mockReturnValue({
      ...SITE_QUERY,
    });

    await act(async () => {
      render(<NotePage data={SITE_QUERY} location={{ pathname: "/notes" }} />);
    });
  });

  it("SEO를 적용한다", async () => {
    await waitFor(() => expect(document.title).toBe("노트 · SOGOAGAIN"));
  });

  it("header를 출력한다", () => {
    const noteEl = screen.queryByRole("link", { name: "노트" });
    const postEl = screen.getByText("포스트");
    const aboutEl = screen.getByText("소개");

    expect(noteEl).toBe(null);
    expect(postEl).toBeInTheDocument();
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
    const note1Date = screen.getByText("2023.12.24");

    const note2 = screen.getByText("노트 2");
    const note2Date = screen.getByText("2024.01.05");

    const note3 = screen.getByText("노트 3");
    const note3Date = screen.getByText("2024.01.06");

    const primalRepostNote = screen.getByText(/Primal에서 인용한 노트/);
    const primalRepostNoteDate = screen.getByText("2024.01.06");
    const primalQuotedNote = screen.getByText("note1txds23y...fq2fk7ch");

    expect(note1).toBeInTheDocument();
    expect(note1Date).toBeInTheDocument();

    expect(note2).toBeInTheDocument();
    expect(note2Date).toBeInTheDocument();

    expect(note3).toBeInTheDocument();
    expect(note3Date).toBeInTheDocument();

    expect(primalRepostNote).toBeInTheDocument();
    expect(primalRepostNoteDate).toBeInTheDocument();
    expect(primalQuotedNote).toBeInTheDocument();
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

    expect(items).toHaveLength(10);
  });

  it("ETC 해시태그 필터를 선택하면 태그가 없는 노트를 출력한다", () => {
    const hashtagEl = screen.getByText("ETC");
    fireEvent.click(hashtagEl);

    const items = screen.getAllByRole("listitem");
    const note3 = screen.getByText("노트 3");

    expect(items).toHaveLength(5);
    expect(note3).toBeInTheDocument();
  });

  it("노트에 포함된 이미지를 출력한다", () => {
    const img = screen.getByAltText("이미지");

    expect(img).toBeInTheDocument();
  });

  context("멘션된 프로필", () => {
    context("조회하지 못하면", () => {
      it("npub을 축약해 출력한다", () => {
        const note = screen.getByText("조회하지 못한 멘션과 인용");
        const mention = screen.getByText("@npub1zatgwjy");

        expect(note).toBeInTheDocument();
        expect(mention).toBeInTheDocument();
      });
    });

    context("조회하면", () => {
      it("사용자 이름을 출력한다", () => {
        const note = screen.getByText("멘션된 프로필을 조회한 노트");
        const mention = screen.getByText("@mockusername2");

        expect(note).toBeInTheDocument();
        expect(mention).toBeInTheDocument();
      });
    });
  });

  context("인용된 노트", () => {
    context("조회하지 못하면", () => {
      it("note id를 축약해 출력한다", () => {
        const note = screen.getByText("조회하지 못한 멘션과 인용");
        const quotedNote = screen.getByText("note1gesl9am...9qppm3ju");

        expect(note).toBeInTheDocument();
        expect(quotedNote).toBeInTheDocument();
      });
    });

    context("조회하면", () => {
      it("인용된 노트를 출력한다", () => {
        const note = screen.getByText("인용된 노트를 조회한 노트");
        const quotedNote = screen.getByText("인용된 노트 입니다.");
        const mentionOfQuotedNote = screen.getByText("@npub1zsewm9p");
        const writer = screen.getByText("인용글작성자");

        expect(note).toBeInTheDocument();
        expect(quotedNote).toBeInTheDocument();
        expect(mentionOfQuotedNote).toBeInTheDocument();
        expect(writer).toBeInTheDocument();
      });
    });
  });

  it("노트들을 생성일 기준으로 정렬한 뒤 출력한다", () => {
    const noteEls = screen.getAllByRole("listitem");

    expect(noteEls).toHaveLength(10);
    expect(noteEls[0].textContent).toContain(
      "2024.02.24Primal에서 인용한 노트",
    );
    expect(noteEls[1].textContent).toContain(
      "2024.02.24@npub1zatgwjy 조회하지 못한 멘션과 인용",
    );
    expect(noteEls[2].textContent).toEqual(
      "2024.02.24@mockusername2 멘션된 프로필을 조회한 노트",
    );
    expect(noteEls[3].textContent).toContain(
      "2024.02.24인용된 노트를 조회한 노트",
    );
    expect(noteEls[4].textContent).toEqual("2024.02.09노트 6 #테스트");
    expect(noteEls[5].textContent).toEqual("2024.01.28노트 5 #Bitcoin");
    expect(noteEls[6].textContent).toEqual("2024.01.17노트 4  #Zaps");
    expect(noteEls[7].textContent).toEqual("2024.01.06노트 3 ");
    expect(noteEls[8].textContent).toEqual("2024.01.05노트 2 #Zaps");
    expect(noteEls[9].textContent).toEqual(
      "2023.12.24노트 1 https://blog.sogoagain.com/ #Nothing",
    );
  });

  it("footer를 출력한다", () => {
    const goTopEl = screen.getByText("↑ 처음으로");

    expect(goTopEl).toBeInTheDocument();
  });
});
