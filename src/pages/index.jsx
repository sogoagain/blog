import React from "react";

import LayoutContainer from "../container/LayoutContainer";
import PostsContainer from "../container/PostsContainer";

export default function Home() {
  return (
    <LayoutContainer>
      <PostsContainer />
    </LayoutContainer>
  );
}
