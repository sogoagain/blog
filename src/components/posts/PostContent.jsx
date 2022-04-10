import React from "react";

import { css } from "@emotion/react";

import { unit, color } from "../../styles";

export default function PostContent({ html }) {
  return (
    <div
      css={css`
        * {
          margin: ${unit(2)} auto;
          color: ${color.article};
          font-size: ${unit(2)};
          line-height: 1.7;
        }

        h1,
        h2,
        h3 {
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
          padding-left: ${unit(2)};
        }

        li::marker {
          font-size: ${unit(1.5)};
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
