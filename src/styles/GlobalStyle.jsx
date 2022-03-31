import React from "react";

import { Global, css } from "@emotion/react";

export default function GlobalStyle() {
  return (
    <Global
      styles={css`
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        html {
          font-size: 10px;
        }

        body {
          font-family: "Noto Sans KR", sans-serif;
          font-size: 1.6rem;
          min-width: 32rem;
        }

        a {
          text-decoration: none;
          color: #000;
        }

        a:active {
          color: #828282;
        }

        h1 {
          font-size: 2.4rem;
        }
      `}
    />
  );
}
