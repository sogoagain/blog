import React from "react";

import { graphql, useStaticQuery } from "gatsby";

import Post from "../components/posts/Post";
import Comment from "../components/posts/Comment";

const query = graphql`
  query {
    site {
      siteMetadata {
        giscus {
          repo
          repoId
          category
          categoryId
          mapping
          theme
        }
      }
    }
  }
`;

export default function PostContainer({ title, subtitle, date, html }) {
  const {
    site: {
      siteMetadata: { giscus },
    },
  } = useStaticQuery(query);

  return (
    <>
      <Post title={title} subtitle={subtitle} date={date} html={html} />
      <Comment giscus={giscus} />
    </>
  );
}
