import React from "react";

import { useDispatch, useSelector } from "react-redux";

import { graphql, useStaticQuery } from "gatsby";

import TagList from "../components/tags/TagList";

import { toggleTag } from "../features/postsSlice";

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

export default function PostsTagListContainer() {
  const {
    allMarkdownRemark: { group },
  } = useStaticQuery(query);
  const dispatch = useDispatch();
  const { selectedTag } = useSelector((state) => state.posts);

  const tagCounts = new Map();
  group.forEach((item) => {
    const tag = item.tag.trim().toUpperCase();
    tagCounts.set(tag, (tagCounts.get(tag) || 0) + item.totalCount);
  });

  const tags = Array.from(tagCounts.entries())
    .sort(([tagA, countA], [tagB, countB]) => {
      const countDiff = countB - countA;
      return countDiff === 0 ? tagA.localeCompare(tagB, "ko") : countDiff;
    })
    .map(([tag]) => tag);

  const handleClick = (tag) => {
    dispatch(toggleTag(tag));
  };

  return <TagList tags={tags} selected={selectedTag} onClick={handleClick} />;
}
