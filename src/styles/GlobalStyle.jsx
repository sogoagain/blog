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
          font-size: 16px;
        }

        body {
          font-family: "Noto Sans KR", sans-serif;
          min-width: 320px;
        }

        a {
          text-decoration: none;
          color: #000;
        }

        a:active {
          color: #828282;
        }
      `}
    />
  );
}
