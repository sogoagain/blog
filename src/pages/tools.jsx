import React from "react";

import LayoutContainer from "../container/LayoutContainer";
import SeoContainer from "../container/SeoContainer";
import ToolsContainer from "../container/ToolsContainer";

export default function ToolsPage({ location }) {
  return (
    <LayoutContainer location={location}>
      <SeoContainer title="도구" pathname={location.pathname} />
      <h1>도구</h1>
      <hr />
      <ToolsContainer />
    </LayoutContainer>
  );
}
