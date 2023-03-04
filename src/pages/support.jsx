import React from "react";

import styled from "@emotion/styled";

import PostTitle from "../components/posts/PostTitle";
import ParticleNetwork from "../components/support/ParticleNetwork";
import RespectSatoshi from "../components/support/RespectSatoshi";

import LightningContainer from "../container/LightningContainer";
import LayoutContainer from "../container/LayoutContainer";
import SeoContainer from "../container/SeoContainer";

import { unit, base } from "../styles";

const SupportSection = styled.section({
  minHeight: base.pageMinHeight,
  padding: `${unit(4)} ${unit(2)}`,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-between",
  textAlign: "center",
});

export default function SupportPage({ location }) {
  return (
    <LayoutContainer>
      <SeoContainer title="Support" pathname={location.pathname} />
      <ParticleNetwork />
      <SupportSection>
        <PostTitle>Zap ⚡</PostTitle>
        <LightningContainer />
        <RespectSatoshi />
      </SupportSection>
    </LayoutContainer>
  );
}
