import React from "react";

import styled from "@emotion/styled";

import InterestsContainer from "../container/InterestsContainer";
import LayoutContainer from "../container/LayoutContainer";
import PostsContainer from "../container/PostsContainer";
import SeoContainer from "../container/SeoContainer";
import PostsTagListContainer from "../container/PostsTagListContainer";

const Title = styled.h1`
  line-height: 1;
  font-family: monospace;
`;

export default function IndexPage({ location }) {
  return (
    <LayoutContainer location={location}>
      <SeoContainer titleTemplate="%s 블로그" pathname={location.pathname} />
      <Title>
        SO,
        <br />
        GO
        <br />
        AGAIN
      </Title>
      <InterestsContainer />
      <PostsTagListContainer />
      <hr />
      <PostsContainer />
    </LayoutContainer>
  );
}
