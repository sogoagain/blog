import React from "react";

import styled from "@emotion/styled";

import Tag from "./Tag";

const TagListWrapper = styled.div`
  user-select: none;
`;

export default function TagList({ tags, selected, onClick }) {
  return (
    <TagListWrapper>
      {tags.map((tag) => (
        <Tag
          key={`tag-${tag}`}
          text={tag}
          selected={selected === tag}
          handleClick={() => onClick(tag)}
        />
      ))}
    </TagListWrapper>
  );
}
