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

  const tags = group
    .reduce((acc, item) => {
      const tag = item.tag.trim().toUpperCase();
      const foundIndex = acc.findIndex((el) => el.tag === tag);
      if (foundIndex >= 0) {
        acc[foundIndex].totalCount += item.totalCount;
      } else {
        acc.push({
          tag,
          totalCount: item.totalCount,
        });
      }
      return acc;
    }, [])
    .sort((a, b) => {
      const totalCountDiff = b.totalCount - a.totalCount;
      return totalCountDiff === 0
        ? a.tag.localeCompare(b.tag, "ko")
        : totalCountDiff;
    })
    .flatMap((item) => item.tag);

  const handleClick = (tag) => {
    dispatch(toggleTag(tag));
  };

  return <TagList tags={tags} selected={selectedTag} onClick={handleClick} />;
}
