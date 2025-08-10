import React from "react";

import { graphql } from "gatsby";

import ParticleNetwork from "../components/ParticleNetwork";
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
        description={title}
        pathname={location.pathname}
      />
      <ParticleNetwork />
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
