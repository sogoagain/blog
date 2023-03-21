import React from "react";

import { graphql } from "gatsby";

import ParticleNetwork from "../components/support/ParticleNetwork";
import Post from "../components/posts/Post";

import LightningContainer from "../container/LightningContainer";
import LayoutContainer from "../container/LayoutContainer";
import SeoContainer from "../container/SeoContainer";

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
      <p>
        <LightningContainer />
      </p>
    </LayoutContainer>
  );
}

export const aboutQuery = graphql`
  query {
    markdownRemark(fields: { slug: { eq: "/bitcoin/" } }) {
      frontmatter {
        title
      }
      html
    }
  }
`;
