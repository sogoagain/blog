import React from "react";

import Layout from "../components/layouts/Layout";

import FooterContainer from "./FooterContainer";
import HeaderContainer from "./HeaderContainer";

export default function LayoutContainer({ location, children }) {
  return (
    <Layout>
      <HeaderContainer pathname={location.pathname} />
      <main>{children}</main>
      <FooterContainer />
    </Layout>
  );
}
