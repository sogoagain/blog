import React from "react";

import { Layout, Main } from "../components/layouts";

import HeaderContainer from "./HeaderContainer";
import FooterContainer from "./FooterContainer";

export default function LayoutContainer({ children }) {
  return (
    <Layout>
      <HeaderContainer />
      <Main>{children}</Main>
      <FooterContainer />
    </Layout>
  );
}
