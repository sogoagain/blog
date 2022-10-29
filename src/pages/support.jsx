import React from "react";

import BitcoinAddressContainer from "../container/BitcoinAddressContainer";
import LayoutContainer from "../container/LayoutContainer";
import SeoContainer from "../container/SeoContainer";

export default function SupportPage({ location }) {
  return (
    <LayoutContainer>
      <SeoContainer title="Support" pathname={location.pathname} />
      <BitcoinAddressContainer />
    </LayoutContainer>
  );
}
