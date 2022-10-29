import React from "react";

import ParticleNetwork from "../components/ParticleNetwork";

import BitcoinAddressContainer from "../container/BitcoinAddressContainer";
import LayoutContainer from "../container/LayoutContainer";
import SeoContainer from "../container/SeoContainer";

export default function SupportPage({ location }) {
  return (
    <LayoutContainer>
      <SeoContainer title="Support" pathname={location.pathname} />
      <ParticleNetwork />
      <BitcoinAddressContainer />
    </LayoutContainer>
  );
}
