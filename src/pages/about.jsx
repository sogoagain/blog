import React from "react";

import { graphql } from "gatsby";

import Post from "../components/posts/Post";

import LayoutContainer from "../container/LayoutContainer";
import SeoContainer from "../container/SeoContainer";

export default function AboutPage({
  data: {
    markdownRemark: {
      frontmatter: { title },
      html,
    },
  },
  location,
}) {
  return (
    <LayoutContainer>
      <SeoContainer
        title={title}
        description={title}
        pathname={location.pathname}
      />
      <Post title={title} html={html} />
    </LayoutContainer>
  );
}

export const aboutQuery = graphql`
  query {
    markdownRemark(fields: { slug: { eq: "/about/" } }) {
      frontmatter {
        title
      }
      html
    }
  }
`;
