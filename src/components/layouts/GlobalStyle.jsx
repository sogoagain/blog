import React from "react";

import { Global, css } from "@emotion/react";

import { unit, color } from "../../styles";

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
          font-family: "Nanum Gothic", sans-serif;
          font-size: ${unit(2)};
          min-width: ${unit(40)};
        }

        a {
          text-decoration: none;
          text-underline-offset: 0.2rem;
          color: ${color.primary};
          &:hover,
          &:focus {
            color: ${color.brand};
          }
        }

        h1 {
          font-size: ${unit(3.25)};
        }

        h2 {
          font-size: ${unit(2.75)};
        }

        header,
        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
          word-break: keep-all;
          word-wrap: break-word;
        }

        footer {
          font-size: ${unit(1.75)};
        }
      `}
    />
  );
}
