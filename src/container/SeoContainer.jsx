import React from "react";

import { graphql, useStaticQuery } from "gatsby";

import Seo from "../components/Seo";

const query = graphql`
  query {
    site {
      siteMetadata {
        title
        titleTemplate
        description
        siteUrl
        image
      }
    }
  }
`;

export default function SeoContainer({
  title,
  titleTemplate,
  description,
  image,
  article,
  pathname,
}) {
  const {
    site: {
      siteMetadata: {
        title: defaultTitle,
        titleTemplate: defaultTitleTemplate,
        description: defaultDescription,
        siteUrl,
        image: defaultImage,
      },
    },
  } = useStaticQuery(query);

  const seo = {
    title: title || defaultTitle,
    titleTemplate: titleTemplate || defaultTitleTemplate,
    description: description || defaultDescription,
    image: `${siteUrl}${image || defaultImage}`,
    url: `${siteUrl}${pathname}`,
    article,
  };

  return <Seo seo={seo} />;
}
