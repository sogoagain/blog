import React from "react";

import { graphql } from "gatsby";

import LayoutContainer from "../../container/LayoutContainer";
import PostContainer from "../../container/PostContainer";
import SeoContainer from "../../container/SeoContainer";

import "katex/dist/katex.min.css";

export default function PostPage({
  data: {
    markdownRemark: {
      frontmatter: { title, subtitle, date },
      html,
    },
  },
  location,
}) {
  return (
    <LayoutContainer>
      <SeoContainer
        title={title}
        description={subtitle}
        article
        pathname={location.pathname}
      />
      <PostContainer
        title={title}
        subtitle={subtitle}
        date={date}
        html={html}
      />
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
