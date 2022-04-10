import React from "react";

import { css } from "@emotion/react";

import { unit, color } from "../../styles";

export default function PostContent({ html }) {
  return (
    <div
      css={css`
        * {
          font-family: "Nanum Myeongjo", serif;
          font-size: ${unit(2.25)};
          margin: ${unit(2)} auto;
          color: ${color.article};
          line-height: 1.7;
        }

        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
          font-family: "Nanum Gothic", sans-serif;
          margin: ${unit(4)} auto ${unit(2)} auto;
        }

        h1 {
          font-size: ${unit(3.25)};
        }

        h2 {
          font-size: ${unit(2.75)};
        }

        h3 {
          font-size: ${unit(2.5)};
        }

        ol,
        ul {
          list-style-position: inside;
        }

        li {
          text-index: ${unit(1)};
          padding-left: ${unit(2)};
        }

        li:before {
          content: "";
          margin-right: -${unit(1)};
        }

        a {
          text-decoration: underline;
        }
      `}
      data-testid="post-content-element"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
