import React from "react";

import InterestsContainer from "../container/InterestsContainer";
import LayoutContainer from "../container/LayoutContainer";
import PostsContainer from "../container/PostsContainer";
import SeoContainer from "../container/SeoContainer";
import PostsTagListContainer from "../container/PostsTagListContainer";

export default function IndexPage({ location }) {
  return (
    <LayoutContainer location={location}>
      <SeoContainer titleTemplate="%s 블로그" pathname={location.pathname} />
      <h1>SOGOAGAIN</h1>
      <InterestsContainer />
      <PostsTagListContainer />
      <hr />
      <PostsContainer />
    </LayoutContainer>
  );
}
