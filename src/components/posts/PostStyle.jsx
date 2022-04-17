import React from "react";

import { css } from "@emotion/react";

import { unit, color } from "../../styles";

export default function PostStyle({ html }) {
  return (
    <div
      css={css`
        font-size: ${unit(2)};
        line-height: 1.8;

        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
          margin: ${unit(4)} auto ${unit(2)} auto;
          word-break: keep-all;
          word-wrap: break-word;
        }

        h1 {
          font-size: ${unit(3)};
        }

        h2 {
          font-size: ${unit(2.5)};
        }

        h3 {
          font-size: ${unit(2.25)};
        }

        p,
        ol,
        ul,
        hr,
        table {
          margin: ${unit(2)} auto;
        }

        ol,
        ul {
          padding-left: ${unit(4)};
          & li {
            margin: ${unit(1)} auto;
          }
        }

        a {
          text-decoration: underline;
        }

        blockquote {
          margin-left: ${unit(1)};
          padding-left: ${unit(1)};
          border-left: ${unit(0.75)} solid ${color.secondary};
        }

        table {
          font-size: ${unit(2)};
          width: 95%;
          border-collapse: collapse;
          & thead tr {
            background-color: ${color.secondary};
            color: ${color.background};
            & th:not(:last-child) {
              border-right: 1px solid ${color.background};
            }
          }
          & th,
          td {
            border: 1px solid ${color.secondary};
            padding: ${unit(1)};
          }
        }

        .gatsby-highlight {
          margin: ${unit(2)} auto;
          padding: 0 ${unit(2)};
          & code[class*="language-"],
          pre[class*="language-"] {
            font-size: ${unit(2)};
            font-family: "D2Coding", monospace;
          }
        }
      `}
      data-testid="post-content-element"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
