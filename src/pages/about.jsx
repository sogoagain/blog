import React from "react";

import { graphql } from "gatsby";

import styled from "@emotion/styled";

import Post from "../components/posts/Post";

import LayoutContainer from "../container/LayoutContainer";
import SeoContainer from "../container/SeoContainer";

import { unit } from "../styles";

const AboutSection = styled.article({
  padding: `${unit(4)} ${unit(2)}`,
  margin: "0 auto",
});

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
      <AboutSection>
        <Post title={title} html={html} />
      </AboutSection>
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
