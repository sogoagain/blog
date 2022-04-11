import React from "react";

import { graphql } from "gatsby";

import LayoutContainer from "../../container/LayoutContainer";
import Post from "../../components/posts/Post";

import "katex/dist/katex.min.css";

export default function PostPage({
  data: {
    markdownRemark: {
      frontmatter: { title, subtitle, date },
      html,
    },
  },
}) {
  return (
    <LayoutContainer>
      <Post title={title} subtitle={subtitle} date={date} html={html} />
    </LayoutContainer>
  );
}

export const postQuery = graphql`
  query ($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        date
        title
        subtitle
      }
    }
  }
`;
