import React from "react";

import styled from "@emotion/styled";

import PostTitle from "../components/posts/PostTitle";
import ParticleNetworkBackground from "../components/ParticleNetworkBackground";

import BitcoinAddressContainer from "../container/BitcoinAddressContainer";
import LayoutContainer from "../container/LayoutContainer";
import SeoContainer from "../container/SeoContainer";

import { unit, base } from "../styles";

const SupportSection = styled.section({
  minHeight: base.pageMinHeight,
  padding: `${unit(4)} ${unit(2)}`,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
});

export default function SupportPage({ location }) {
  return (
    <LayoutContainer>
      <SeoContainer title="Support" pathname={location.pathname} />
      <ParticleNetworkBackground />
      <SupportSection>
        <div>
          <PostTitle>Buy me a 막걸리🌾</PostTitle>
          <BitcoinAddressContainer />
        </div>
      </SupportSection>
    </LayoutContainer>
  );
}
