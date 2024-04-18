import React from "react";

import styled from "@emotion/styled";

import { graphql } from "gatsby";

import ParticleNetwork from "../components/bitcoin/ParticleNetwork";
import Post from "../components/posts/Post";

import LightningContainer from "../container/LightningContainer";
import LayoutContainer from "../container/LayoutContainer";
import SeoContainer from "../container/SeoContainer";

const Wrapper = styled.div`
  margin: 1rem 0;
  padding: 0 2rem;
`;

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
      <h2>라이트닝 잽 ⚡</h2>
      <Wrapper>
        <LightningContainer />
      </Wrapper>
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
