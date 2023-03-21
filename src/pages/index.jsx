import React from "react";

import HeroContainer from "../container/HeroContainer";
import LayoutContainer from "../container/LayoutContainer";
import PostsContainer from "../container/PostsContainer";
import SeoContainer from "../container/SeoContainer";

export default function IndexPage({ location }) {
  return (
    <LayoutContainer>
      <SeoContainer titleTemplate="%s 블로그" pathname={location.pathname} />
      <h1>SOGOAGAIN</h1>
      <p>
        <HeroContainer />
      </p>
      <p>소프트웨어 개발과 비트코인에 관해 이야기합니다.</p>
      <p>No pain, no gain, so go again.</p>
      <hr />
      <PostsContainer />
    </LayoutContainer>
  );
}
