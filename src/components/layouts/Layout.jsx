import React from "react";

import GlobalStyle from "./GlobalStyle";

export default function Layout({ children }) {
  return (
    <>
      <GlobalStyle />
      {children}
    </>
  );
}
