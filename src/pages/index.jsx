import React from "react";

import HeroContainer from "../container/HeroContainer";
import LayoutContainer from "../container/LayoutContainer";
import PostsContainer from "../container/PostsContainer";
import SeoContainer from "../container/SeoContainer";

export default function IndexPage({ location }) {
  return (
    <LayoutContainer>
      <SeoContainer titleTemplate="%s 블로그" pathname={location.pathname} />
      <HeroContainer />
      <PostsContainer />
    </LayoutContainer>
  );
}
