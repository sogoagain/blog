import React from "react";

import Layout from "../components/Layout";
import MainWrapper from "../components/MainWrapper";

import HeaderContainer from "../container/HeaderContainer";
import PostsContainer from "../container/PostsContainer";

export default function Home() {
  return (
    <Layout>
      <HeaderContainer />
      <MainWrapper>
        <PostsContainer />
      </MainWrapper>
    </Layout>
  );
}
