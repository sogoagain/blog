import React from "react";

import { useStaticQuery } from "gatsby";

import { render, screen, fireEvent } from "../testUtils";

import PostsTagListContainer from "./PostsTagListContainer";

import TAGS_QUERY from "../__fixtures__/tagsQuery";

describe("<PostsTagListContainer/>", () => {
  beforeEach(() => {
    useStaticQuery.mockReturnValue({
      ...TAGS_QUERY,
    });

    render(<PostsTagListContainer />);
  });

  it("태그 목록을 출력한다", () => {
    ["설정", "C++", "DB", "DOCKER", "GIT"].forEach((tag) => {
      const tagEl = screen.getByText(tag);

      expect(tagEl).toBeInTheDocument();
    });
  });

  it("태그 목록이 totalCount 기준으로 내림차순, totalCount가 동일하면 한국어 기준 정렬되어 출력된다", () => {
    const tags = screen.getAllByText(/.+/).map((label) => label.textContent);

    const sortedTags = ["GIT", "설정", "C++", "DB", "DOCKER"];

    expect(tags).toEqual(sortedTags);
  });

  it("태그를 클릭하면 선택되고, 다른 태그를 클릭하면 이전 태그는 선택 해제된다", () => {
    const tag1 = screen.getByText("C++");
    const tag2 = screen.getByText("DB");
    const tag3 = screen.getByText("DOCKER");
    const tag4 = screen.getByText("GIT");
    const tag5 = screen.getByText("설정");

    expect(tag1.closest("label").querySelector("input")).not.toBeChecked();
    expect(tag2.closest("label").querySelector("input")).not.toBeChecked();
    expect(tag3.closest("label").querySelector("input")).not.toBeChecked();
    expect(tag4.closest("label").querySelector("input")).not.toBeChecked();
    expect(tag5.closest("label").querySelector("input")).not.toBeChecked();

    fireEvent.click(tag1);
    expect(tag1.closest("label").querySelector("input")).toBeChecked();
    expect(tag2.closest("label").querySelector("input")).not.toBeChecked();
    expect(tag3.closest("label").querySelector("input")).not.toBeChecked();
    expect(tag4.closest("label").querySelector("input")).not.toBeChecked();
    expect(tag5.closest("label").querySelector("input")).not.toBeChecked();

    fireEvent.click(tag2);
    expect(tag1.closest("label").querySelector("input")).not.toBeChecked();
    expect(tag2.closest("label").querySelector("input")).toBeChecked();
    expect(tag3.closest("label").querySelector("input")).not.toBeChecked();
    expect(tag4.closest("label").querySelector("input")).not.toBeChecked();
    expect(tag5.closest("label").querySelector("input")).not.toBeChecked();

    fireEvent.click(tag3);
    expect(tag1.closest("label").querySelector("input")).not.toBeChecked();
    expect(tag2.closest("label").querySelector("input")).not.toBeChecked();
    expect(tag3.closest("label").querySelector("input")).toBeChecked();
    expect(tag4.closest("label").querySelector("input")).not.toBeChecked();
    expect(tag5.closest("label").querySelector("input")).not.toBeChecked();

    fireEvent.click(tag3);
    expect(tag1.closest("label").querySelector("input")).not.toBeChecked();
    expect(tag2.closest("label").querySelector("input")).not.toBeChecked();
    expect(tag3.closest("label").querySelector("input")).not.toBeChecked();
    expect(tag4.closest("label").querySelector("input")).not.toBeChecked();
    expect(tag5.closest("label").querySelector("input")).not.toBeChecked();
  });
});
