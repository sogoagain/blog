import React from "react";

import LayoutContainer from "../container/LayoutContainer";
import SeoContainer from "../container/SeoContainer";
import NostrContainer from "../container/NostrContainer";

export default function NotePage({ location }) {
  return (
    <LayoutContainer>
      <SeoContainer title="노트" pathname={location.pathname} />
      <h1>노트</h1>
      <NostrContainer />
    </LayoutContainer>
  );
}
