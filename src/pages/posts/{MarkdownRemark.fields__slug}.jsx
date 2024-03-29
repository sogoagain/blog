import React, { useEffect } from "react";

import { graphql, navigate } from "gatsby";

import LayoutContainer from "../../container/LayoutContainer";
import PostContainer from "../../container/PostContainer";
import SeoContainer from "../../container/SeoContainer";

import "katex/dist/katex.min.css";

export default function PostPage({ data: { markdownRemark }, location }) {
  useEffect(() => {
    if (markdownRemark === null) {
      navigate("/404");
    }
  }, [markdownRemark]);

  if (!markdownRemark) {
    return null;
  }

  const {
    frontmatter: { title, subtitle, date },
    html,
  } = markdownRemark;

  return (
    <LayoutContainer location={location}>
      <SeoContainer
        title={title}
        description={subtitle}
        article
        pathname={location.pathname}
      />
      <PostContainer
        title={title}
        subtitle={subtitle}
        date={date}
        html={html}
      />
    </LayoutContainer>
  );
}

export const postQuery = graphql`
  query ($id: String!) {
    markdownRemark(id: { eq: $id }, fileAbsolutePath: { regex: "/(posts)/" }) {
      html
      frontmatter {
        date
        title
        subtitle
      }
    }
  }
`;
