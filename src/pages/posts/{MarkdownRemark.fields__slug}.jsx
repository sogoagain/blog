import React from "react";

import { graphql } from "gatsby";

import LayoutContainer from "../../container/LayoutContainer";

export default function PostPage({ data }) {
  const { markdownRemark } = data;
  const { frontmatter, html } = markdownRemark;

  return (
    <LayoutContainer>
      <h1>{frontmatter.title}</h1>
      <h2>{frontmatter.subtitle}</h2>
      <h3>{frontmatter.date}</h3>
      <div
        data-testid="post-body-element"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </LayoutContainer>
  );
}

export const postQuery = graphql`
  query ($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        subtitle
      }
    }
  }
`;
