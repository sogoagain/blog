import React from "react";

import { useDispatch, useSelector } from "react-redux";

import { graphql, useStaticQuery } from "gatsby";

import TagList from "../components/tags/TagList";

import { toggleTag } from "../features/tagSlice";

const query = graphql`
  query {
    allMarkdownRemark {
      group(field: { frontmatter: { tags: SELECT } }) {
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
      return totalCountDiff === 0
        ? a.tag.localeCompare(b.tag, "ko")
        : totalCountDiff;
    })
    .flatMap((item) => item.tag.trim());

  const handleClick = (tag) => {
    dispatch(toggleTag(tag));
  };

  return <TagList tags={tags} selected={selected} onClick={handleClick} />;
}
