import React from "react";

import { css } from "@emotion/react";

export default function PostStyle({ html }) {
  return (
    <div
      css={css`
        .gatsby-resp-image-wrapper + em {
          display: block;
          text-align: center;
          margin-top: 0.5rem;
          margin-bottom: 1rem;
        }
      `}
      data-testid="post-content-element"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
