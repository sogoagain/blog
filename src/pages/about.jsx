import React from "react";

import LayoutContainer from "../container/LayoutContainer";
import SeoContainer from "../container/SeoContainer";

export default function About({ location }) {
  return (
    <LayoutContainer>
      <SeoContainer titleTemplate="%s 블로그" pathname={location.pathname} />
    </LayoutContainer>
  );
}
