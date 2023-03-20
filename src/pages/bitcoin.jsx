import React from "react";

import ParticleNetwork from "../components/support/ParticleNetwork";
import RespectSatoshi from "../components/support/RespectSatoshi";

import LightningContainer from "../container/LightningContainer";
import LayoutContainer from "../container/LayoutContainer";
import SeoContainer from "../container/SeoContainer";

export default function BitcoinPage({ location }) {
  return (
    <LayoutContainer>
      <SeoContainer title="Support" pathname={location.pathname} />
      <ParticleNetwork />
      <h1>Zap ⚡</h1>
      <LightningContainer />
      <RespectSatoshi />
    </LayoutContainer>
  );
}
