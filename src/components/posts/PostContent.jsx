import React from "react";

import { css } from "@emotion/react";

import { unit, color } from "../../styles";

export default function PostContent({ html }) {
  return (
    <div
      css={css`
        font-family: "Nanum Myeongjo", serif;
        font-size: ${unit(2.25)};
        line-height: 1.7;
        word-break: keep-all;

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

        p,
        ol,
        ul,
        hr,
        table {
          margin: ${unit(2)} auto;
        }

        ol,
        ul {
          list-style-position: inside;
          & li {
            margin: ${unit(1)} auto;
            padding-left: ${unit(2)};
            & p {
              display: inline;
            }
          }
        }

        ul > li:before {
          content: "";
          margin-right: -${unit(1)};
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
          font-family: "Nanum Gothic", sans-serif;
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
          padding: 0 ${unit(2)};
          & pre[class*="language-"] {
            border-radius: ${unit(2)};
          }

          & code[class*="language-"],
          pre[class*="language-"] {
            font-size: ${unit(2)};
            font-family: "D2Coding", monospace;
            word-break: normal;
          }
        }
      `}
      data-testid="post-content-element"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
