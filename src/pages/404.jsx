import React from "react";

import { Link } from "gatsby";

import LayoutContainer from "../container/LayoutContainer";
import SeoContainer from "../container/SeoContainer";

function NotFoundPage({ location }) {
  return (
    <LayoutContainer>
      <SeoContainer
        title="404"
        description="페이지를 찾을 수 없습니다"
        pathname={location.pathname}
      />
      <h1>페이지를 찾을 수 없습니다</h1>
      <Link to="/">홈으로 돌아가기</Link>
    </LayoutContainer>
  );
}

export default NotFoundPage;
