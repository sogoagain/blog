import React from "react";

import { Link } from "gatsby";

import LayoutContainer from "../container/LayoutContainer";
import SeoContainer from "../container/SeoContainer";

const pageStyles = {
  color: "#232129",
  padding: "96px",
};

const headingStyles = {
  marginTop: 0,
  marginBottom: 64,
  maxWidth: 320,
};

function NotFoundPage({ location }) {
  return (
    <LayoutContainer>
      <SeoContainer
        title="404"
        description="페이지를 찾을 수 없습니다"
        pathname={location.pathname}
      />
      <div style={pageStyles}>
        <h1 style={headingStyles}>페이지를 찾을 수 없습니다</h1>
        <Link to="/">돌아가기</Link>
      </div>
    </LayoutContainer>
  );
}

export default NotFoundPage;
