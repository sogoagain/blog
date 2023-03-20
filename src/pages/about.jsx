import React from "react";

import { graphql } from "gatsby";

import PostStyle from "../components/posts/PostStyle";

import LayoutContainer from "../container/LayoutContainer";
import ReadingListContainer from "../container/ReadingListContainer";
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
      <article>
        <PostStyle html={html} />
        <ReadingListContainer />
      </article>
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
