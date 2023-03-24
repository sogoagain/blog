import React from "react";

import { useSelector } from "react-redux";

import { graphql, useStaticQuery } from "gatsby";

import PostList from "../components/posts/PostList";

const query = graphql`
  query {
    allMarkdownRemark(
      sort: { fields: frontmatter___date, order: DESC }
      filter: { fileAbsolutePath: { regex: "/(posts)/" } }
    ) {
      nodes {
        frontmatter {
          date
          subtitle
          title
          tags
        }
        fields {
          slug
        }
      }
    }
  }
`;

export default function PostsContainer() {
  const {
    allMarkdownRemark: { nodes },
  } = useStaticQuery(query);
  const { selected } = useSelector((state) => state.tag);

  const filteredPosts = selected
    ? nodes.filter(({ frontmatter }) => frontmatter.tags.includes(selected))
    : nodes;

  return (
    <PostList
      posts={filteredPosts.map(({ frontmatter, fields }) => ({
        ...frontmatter,
        ...fields,
      }))}
      basePath="/posts"
    />
  );
}
