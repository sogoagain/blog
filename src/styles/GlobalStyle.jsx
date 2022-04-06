import React from "react";

import { Global, css } from "@emotion/react";

import { unit, color } from ".";

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
          font-size: ${unit(2)};
          min-width: ${unit(40)};
          word-break: keep-all;
          word-wrap: break-word;
        }

        a {
          text-decoration: none;
          color: ${color.primary};
        }

        h1 {
          font-size: ${unit(3)};
        }

        h2 {
          font-size: ${unit(2.5)};
        }
      `}
    />
  );
}
