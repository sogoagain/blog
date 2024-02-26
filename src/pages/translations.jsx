import React from "react";

import LayoutContainer from "../container/LayoutContainer";
import SeoContainer from "../container/SeoContainer";
import TranslationsContainer from "../container/TranslationsContainer";

export default function TranslationsPage({ location }) {
  return (
    <LayoutContainer>
      <SeoContainer title="번역" pathname={location.pathname} />
      <h1>번역</h1>
      <TranslationsContainer />
    </LayoutContainer>
  );
}
