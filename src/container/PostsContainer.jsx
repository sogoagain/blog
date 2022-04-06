import React, { useState, useEffect } from "react";

import { graphql, useStaticQuery } from "gatsby";

import styled from "@emotion/styled";

import PostList from "../components/posts/PostList";

import { unit } from "../styles";

const PostsSection = styled.section({
  padding: `${unit(2)} ${unit(3)}`,
  wordBreak: "keep-all",
  wordWrap: "break-word",
});

export default function PostsContainer() {
  const {
    allMarkdownRemark: { nodes },
  } = useStaticQuery(graphql`
    query {
      allMarkdownRemark(sort: { fields: frontmatter___date, order: DESC }) {
        nodes {
          frontmatter {
            date
            subtitle
            title
          }
          fields {
            slug
          }
        }
      }
    }
  `);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    setPosts(
      nodes.map(({ frontmatter, fields }) => ({
        ...frontmatter,
        ...fields,
      }))
    );
  }, [nodes]);

  return (
    <PostsSection>
      <PostList posts={posts} basePath="/posts" />
    </PostsSection>
  );
}
