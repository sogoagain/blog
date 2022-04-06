import React from "react";

import styled from "@emotion/styled";

import GlobalStyle from "./GlobalStyle";

import { unit } from "../../styles";

const GlobalWrapper = styled.div({
  maxWidth: unit(160),
  margin: "0 auto",
});

export default function Layout({ children }) {
  return (
    <GlobalWrapper>
      <GlobalStyle />
      {children}
    </GlobalWrapper>
  );
}
