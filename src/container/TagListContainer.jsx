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

  const tags = group
    .sort((a, b) => {
      const totalCountDiff = b.totalCount - a.totalCount;
      return totalCountDiff === 0 ? a.tag.localeCompare(b.tag) : totalCountDiff;
    })
    .flatMap((item) => item.tag.trim());

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
