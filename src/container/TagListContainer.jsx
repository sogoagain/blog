import React from "react";

import { useDispatch, useSelector } from "react-redux";

import { graphql, useStaticQuery } from "gatsby";

import styled from "@emotion/styled";

import Tag from "../components/Tag";

import { toggleTag } from "../features/tagSlice";

const TagListWrapper = styled.div`
  user-select: none;
`;

const query = graphql`
  query {
    allMarkdownRemark {
      group(field: frontmatter___tags) {
        tag: fieldValue
        totalCount
      }
    }
  }
`;

export default function TagListContainer() {
  const {
    allMarkdownRemark: { group },
  } = useStaticQuery(query);
  const dispatch = useDispatch();
  const { selected } = useSelector((state) => state.tag);

  const tags = [...new Set(group.flatMap((item) => item.tag.trim()))].sort(
    (a, b) => a.localeCompare(b)
  );

  const handleClick = (tag) => {
    dispatch(toggleTag(tag));
  };

  return (
    <TagListWrapper>
      {tags.map((tag) => (
        <Tag
          key={`tag-${tag}`}
          text={tag}
          selected={selected === tag}
          handleClick={() => handleClick(tag)}
        />
      ))}
    </TagListWrapper>
  );
}
