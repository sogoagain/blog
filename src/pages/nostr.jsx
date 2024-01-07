import React from "react";

import LayoutContainer from "../container/LayoutContainer";
import SeoContainer from "../container/SeoContainer";
import NostrContainer from "../container/NostrContainer";

export default function NostrPage({ location }) {
  return (
    <LayoutContainer>
      <SeoContainer title="Nostr" pathname={location.pathname} />
      <h1>Nostr</h1>
      <NostrContainer />
    </LayoutContainer>
  );
}
