import React from "react";

import styled from "@emotion/styled";

import GlobalStyle from "../styles/GlobalStyle";
import { unit } from "../styles/styles";

const GlobalWrapper = styled.div({
  maxWidth: unit(180),
  marginLeft: "auto",
  marginRight: "auto",
});

export default function Layout({ children }) {
  return (
    <GlobalWrapper>
      <GlobalStyle />
      {children}
    </GlobalWrapper>
  );
}
