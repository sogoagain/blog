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
`;

export default function BitcoinPage({
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
      <SeoContainer title="비트코인" pathname={location.pathname} />
      <ParticleNetwork />
      <Post title={title} html={html} />
      <h2>라이트닝 잽 ⚡</h2>
      <Wrapper>
        <LightningContainer />
      </Wrapper>
    </LayoutContainer>
  );
}

export const bitcoinQuery = graphql`
  query {
    markdownRemark(fields: { slug: { eq: "/bitcoin/" } }) {
      frontmatter {
        title
      }
      html
    }
  }
`;
