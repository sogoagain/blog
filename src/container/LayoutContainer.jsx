import React from "react";

import styled from "@emotion/styled";

import ErrorBoundary from "../components/ErrorBoundary";
import Layout from "../components/layouts/Layout";

import FooterContainer from "./FooterContainer";
import HeaderContainer from "./HeaderContainer";

const SkipLink = styled.a`
  position: absolute;
  left: -9999px;
  top: auto;

  &:focus {
    left: 0;
    top: 0;
    padding: 0.5rem;
    background: var(--color-accent);
    color: var(--color-accent-text);
    z-index: 1000;
  }
`;

export default function LayoutContainer({ location, children }) {
  return (
    <Layout>
      <SkipLink href="#main-content">본문으로 건너뛰기</SkipLink>
      <HeaderContainer pathname={location.pathname} />
      <main id="main-content">
        <ErrorBoundary>{children}</ErrorBoundary>
      </main>
      <FooterContainer />
    </Layout>
  );
}
