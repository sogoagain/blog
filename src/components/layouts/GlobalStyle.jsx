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
          line-height: 1.45;
          margin: 0 auto;
          max-width: 45rem;
          padding: 0 15px;
        }
        hr {
          background-color: grey;
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
        span.created {
          display: block;
          margin: 4px 15px;
        }
        img {
          height: auto;
          max-width: 100%;
          width: auto;
        }
        blockquote {
          border: 1px solid;
          border-left: 6px solid;
          margin: 2rem 0;
          padding: 10px;
        }
        blockquote p {
          margin: 0;
        }
        figure {
          margin: 2rem 0;
        }
        figcaption {
          color: slategrey;
        }
        table {
          border-collapse: collapse;
          margin: 2rem 0;
          text-align: left;
          width: 100%;
        }
        tr {
          border-bottom: 1px solid lightgrey;
        }
        tr:nth-of-type(odd) td {
          background-color: #f8f8f8;
        }
        th,
        td {
          padding: 6px;
        }
        footer {
          border-top: 1px dashed grey;
          margin: 2rem 0;
          padding: 1rem 15px;
        }
      `}
    />
  );
}
