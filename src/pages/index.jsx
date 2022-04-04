import React from "react";

import Layout from "../components/Layout";
import MainWrapper from "../components/MainWrapper";

import HeaderContainer from "../container/HeaderContainer";
import PostsContainer from "../container/PostsContainer";
import FooterContainer from "../container/FooterContainer";

export default function Home() {
  return (
    <Layout>
      <HeaderContainer />
      <MainWrapper>
        <PostsContainer />
      </MainWrapper>
      <FooterContainer />
    </Layout>
  );
}
