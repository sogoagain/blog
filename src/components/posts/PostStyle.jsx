import React from "react";

import styled from "@emotion/styled";

const PostContent = styled.div`
  .gatsby-resp-image-wrapper + em {
    display: block;
    text-align: center;
    margin-top: 0.5rem;
    margin-bottom: 1rem;
  }
`;

export default function PostStyle({ html }) {
  return (
    <PostContent
      data-testid="post-content-element"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
