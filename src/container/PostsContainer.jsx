import React from "react";

import { useSelector } from "react-redux";

import { graphql, useStaticQuery } from "gatsby";

import PostList from "../components/posts/PostList";

const query = graphql`
  query {
    allMarkdownRemark(
      sort: { frontmatter: { date: DESC } }
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
  const { selectedTag } = useSelector((state) => state.posts);

  const filteredPosts = selectedTag
    ? nodes.filter(({ frontmatter }) => frontmatter.tags.includes(selectedTag))
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
