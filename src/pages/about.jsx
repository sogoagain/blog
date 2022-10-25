import React from "react";

import { graphql } from "gatsby";

import styled from "@emotion/styled";

import PostStyle from "../components/posts/PostStyle";

import HeroContainer from "../container/HeroContainer";
import LayoutContainer from "../container/LayoutContainer";
import ReadingListContainer from "../container/ReadingListContainer";
import SeoContainer from "../container/SeoContainer";

import { unit } from "../styles";

const AboutSection = styled.article({
  padding: `${unit(1)} ${unit(2)}`,
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
      <HeroContainer />
      <AboutSection>
        <PostStyle html={html} />
        <ReadingListContainer />
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
