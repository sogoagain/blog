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
          color: ${color.primary};
        }

        h1 {
          font-size: ${unit(3.25)};
        }

        h2 {
          font-size: ${unit(2.75)};
        }

        footer {
          font-size: ${unit(1.75)};
        }
      `}
    />
  );
}
