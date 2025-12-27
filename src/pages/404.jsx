import React from "react";

import LayoutContainer from "../container/LayoutContainer";
import SeoContainer from "../container/SeoContainer";

function NotFoundPage({ location }) {
  return (
    <LayoutContainer location={location}>
      <SeoContainer
        title="404"
        description="페이지를 찾을 수 없습니다"
        pathname={location.pathname}
      />
      <h1>페이지를 찾을 수 없습니다</h1>
    </LayoutContainer>
  );
}

export default NotFoundPage;
