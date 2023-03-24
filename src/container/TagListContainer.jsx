import React from "react";

import { useDispatch, useSelector } from "react-redux";

import { graphql, useStaticQuery } from "gatsby";

import styled from "@emotion/styled";

import Tag from "../components/Tag";

import { toggleTag } from "../features/tagSlice";

import { getUniqueTags } from "../utils";

const TagListWrapper = styled.div`
  user-select: none;
`;

const query = graphql`
  query {
    allMarkdownRemark {
      nodes {
        frontmatter {
          tags
        }
      }
    }
  }
`;

export default function TagListContainer() {
  const {
    allMarkdownRemark: { nodes },
  } = useStaticQuery(query);
  const dispatch = useDispatch();
  const { selected } = useSelector((state) => state.tag);

  const handleClick = (tag) => {
    dispatch(toggleTag(tag));
  };

  return (
    <TagListWrapper>
      {getUniqueTags(nodes).map((tag) => (
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
