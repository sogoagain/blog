import React from "react";

import { useStaticQuery } from "gatsby";

import { render, screen, fireEvent } from "../testUtils";

import TagListContainer from "./TagListContainer";

describe("<TagListContainer/>", () => {
  beforeEach(() => {
    useStaticQuery.mockReturnValue({
      allMarkdownRemark: {
        nodes: [
          { frontmatter: { tags: "tag1, tag2" } },
          { frontmatter: { tags: "tag3" } },
          { frontmatter: { tags: "tag4, tag2" } },
        ],
      },
    });

    render(<TagListContainer />);
  });

  it("태그 목록을 출력한다", () => {
    ["tag1", "tag2", "tag3", "tag4"].forEach((tag) => {
      const tagEl = screen.getByText(tag);

      expect(tagEl).toBeInTheDocument();
    });
  });

  it("태그를 클릭하면 토글된다", () => {
    const tag1 = screen.getByText("tag1");
    const tag2 = screen.getByText("tag2");
    const tag3 = screen.getByText("tag3");
    const tag4 = screen.getByText("tag4");

    expect(tag1.closest("label").querySelector("input")).not.toBeChecked();
    expect(tag2.closest("label").querySelector("input")).not.toBeChecked();
    expect(tag3.closest("label").querySelector("input")).not.toBeChecked();
    expect(tag4.closest("label").querySelector("input")).not.toBeChecked();

    fireEvent.click(tag1);
    fireEvent.click(tag2);
    expect(tag1.closest("label").querySelector("input")).toBeChecked();
    expect(tag2.closest("label").querySelector("input")).toBeChecked();
    expect(tag3.closest("label").querySelector("input")).not.toBeChecked();
    expect(tag4.closest("label").querySelector("input")).not.toBeChecked();

    fireEvent.click(tag2);
    expect(tag1.closest("label").querySelector("input")).toBeChecked();
    expect(tag2.closest("label").querySelector("input")).not.toBeChecked();
    expect(tag3.closest("label").querySelector("input")).not.toBeChecked();
    expect(tag4.closest("label").querySelector("input")).not.toBeChecked();

    fireEvent.click(tag3);
    fireEvent.click(tag4);
    expect(tag1.closest("label").querySelector("input")).toBeChecked();
    expect(tag2.closest("label").querySelector("input")).not.toBeChecked();
    expect(tag3.closest("label").querySelector("input")).toBeChecked();
    expect(tag4.closest("label").querySelector("input")).toBeChecked();
  });
});
