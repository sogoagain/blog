import React from "react";

import Layout from "../components/layouts/Layout";

import FooterContainer from "./FooterContainer";
import HeaderContainer from "./HeaderContainer";

export default function LayoutContainer({ children }) {
  return (
    <Layout>
      <HeaderContainer />
      <main>{children}</main>
      <FooterContainer />
    </Layout>
  );
}
