import React from "react";

import { graphql, useStaticQuery } from "gatsby";

import Post from "../components/posts/Post";
import Comment from "../components/posts/Comment";

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
    <>
      <Post title={title} subtitle={subtitle} date={date} html={html} />
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
    </>
  );
}
