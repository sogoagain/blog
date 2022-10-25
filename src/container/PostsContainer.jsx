import React, { useState, useEffect } from "react";

import { graphql, useStaticQuery } from "gatsby";

import styled from "@emotion/styled";

import Hero from "../components/sections/Hero";
import PostList from "../components/posts/PostList";

import useScrambleTexts from "../hooks/useScrambleTexts";

import { unit } from "../styles";

const PostsSection = styled.section({
  padding: `${unit(3)} ${unit(2)}`,
  wordBreak: "keep-all",
  wordWrap: "break-word",
});

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

  const [posts, setPosts] = useState([]);

  const scrambledText = useScrambleTexts([
    "Software",
    "Developer",
    "Engineering",
    "Test Driven Development",
    "Agile",
    "eXtreme Programming",
    "Bitcoin",
    "Decentralization",
    "Web",
  ]);

  useEffect(() => {
    setPosts(
      nodes.map(({ frontmatter, fields }) => ({
        ...frontmatter,
        ...fields,
      }))
    );
  }, [nodes]);

  return (
    <>
      <Hero text={scrambledText} />
      <PostsSection>
        <PostList posts={posts} basePath="/posts" />
      </PostsSection>
    </>
  );
}
