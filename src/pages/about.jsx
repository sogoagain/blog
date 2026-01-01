import React from "react";

import { graphql } from "gatsby";

import Post from "../components/posts/Post";

import LayoutContainer from "../container/LayoutContainer";
import SeoContainer from "../container/SeoContainer";

export default function AboutPage({
  data: {
    markdownRemark: {
      frontmatter: { title, description },
      html,
    },
  },
  location,
}) {
  return (
    <LayoutContainer location={location}>
      <SeoContainer
        title={title}
        description={description}
        pathname={location.pathname}
      />
      <Post title={title} description={description} html={html} />
    </LayoutContainer>
  );
}

export const aboutQuery = graphql`
  query {
    markdownRemark(fields: { slug: { eq: "/about/" } }) {
      frontmatter {
        title
        description
      }
      html
    }
  }
`;
