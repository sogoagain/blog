import React from "react";

import styled from "@emotion/styled";

import GlobalStyle from "../styles/GlobalStyle";

const Wrapper = styled.div({
  maxWidth: "1024px",
  marginLeft: "auto",
  marginRight: "auto",
});

export default function Layout({ children }) {
  return (
    <Wrapper>
      <GlobalStyle />
      {children}
    </Wrapper>
  );
}
