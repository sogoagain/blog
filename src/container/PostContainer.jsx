import React from "react";

import { graphql, useStaticQuery } from "gatsby";

import styled from "@emotion/styled";

import Post from "../components/posts/Post";
import Comment from "../components/posts/Comment";

import { unit } from "../styles";

const PostSection = styled.article({
  padding: `${unit(4)} ${unit(2)}`,
  margin: "0 auto",
});

const PostWrapper = styled.div({
  marginBottom: unit(8),
});

const query = graphql`
  query {
    site {
      siteMetadata {
        utterances {
          src
          repo
          issue_term
          label
          theme
          crossorigin
          async
        }
      }
    }
  }
`;

export default function PostContainer({ title, subtitle, date, html }) {
  const {
    site: {
      siteMetadata: {
        utterances: { src, repo, issue_term, label, theme, crossorigin, async },
      },
    },
  } = useStaticQuery(query);

  return (
    <PostSection>
      <PostWrapper>
        <Post title={title} subtitle={subtitle} date={date} html={html} />
      </PostWrapper>
      <Comment
        utterances={{
          src,
          repo,
          "issue-term": issue_term,
          label,
          theme,
          crossorigin,
          async,
        }}
      />
    </PostSection>
  );
}
