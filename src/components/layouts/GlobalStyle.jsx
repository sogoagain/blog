import React from "react";

import { Global, css } from "@emotion/react";

export default function GlobalStyle() {
  return (
    <Global
      styles={css`
        * {
          box-sizing: border-box;
        }

        body {
          font-family: sans-serif;
          line-height: 1.5;
          margin: 0 auto;
          max-width: 45rem;
          padding: 0 1rem;
        }

        a {
          text-decoration-skip-ink: auto;
        }

        hr {
          background-color: var(--color-border);
          border: 0;
          height: 1px;
          margin: 2rem 0;
        }

        nav {
          margin: 2rem 0 0;
        }

        main {
          hyphens: auto;
        }

        h1,
        h2,
        h3,
        h4 {
          margin: 2rem 0 0;
        }

        h1 {
          margin-bottom: 0.5rem;
        }

        h1 + p {
          margin: 0 0 1rem;
        }

        img,
        video {
          border: 1px solid var(--color-border-light);
          height: auto;
          max-width: 100%;
          width: auto;
        }

        blockquote {
          border-left: 4px solid var(--color-border);
          margin: 2rem 0;
          padding: 0 1rem;
          color: var(--color-text-muted);
        }

        blockquote p {
          margin: 0;
        }

        figure {
          margin: 2rem 0;
        }

        figcaption {
          color: var(--color-text-muted);
        }

        code {
          border: 1px solid;
          padding: 0.125rem 0.25rem;
          tab-size: 4;
        }

        pre {
          border: 1px solid;
        }

        pre code {
          border: 0;
          display: block;
          overflow-x: auto;
          padding: 0.5rem 0.75rem;
        }

        table {
          border-collapse: collapse;
          margin: 2rem 0;
          text-align: left;
          width: 100%;
        }

        tr {
          border-bottom: 1px solid var(--color-border-light);
        }

        th,
        td {
          padding: 0.5rem;
        }

        footer {
          border-top: 1px dashed var(--color-border);
          margin: 2rem 0;
          padding: 1rem 0;
        }

        button {
          font-size: 1rem;
          padding: 0.25rem 0.5rem;
          border: 1px solid;
          color: inherit;
          background-color: inherit;

          &:hover,
          &:focus-visible {
            border-color: var(--color-accent);
            color: var(--color-accent-text);
            background-color: var(--color-accent);
            outline: none;
          }
        }

        a:focus-visible {
          outline: 2px solid var(--color-accent);
          outline-offset: 2px;
        }

        @supports (color-scheme: dark light) {
          @media screen and (prefers-color-scheme: dark) {
            a:link {
              color: var(--color-link);
            }

            a:visited {
              color: var(--color-link-visited);
            }

            a:active {
              color: var(--color-accent);
            }
          }
        }
      `}
    />
  );
}
