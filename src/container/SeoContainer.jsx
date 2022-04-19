import React from "react";

import { useStaticQuery, graphql } from "gatsby";

import Seo from "../components/Seo";

const query = graphql`
  query SEO {
    site {
      siteMetadata {
        title
        titleTemplate
        description
        siteUrl
        image
        social {
          twitter
        }
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
        social: { twitter },
      },
    },
  } = useStaticQuery(query);

  const seo = {
    title: title || defaultTitle,
    titleTemplate: titleTemplate || defaultTitleTemplate,
    description: description || defaultDescription,
    image: `${siteUrl}${image || defaultImage}`,
    url: `${siteUrl}${pathname}`,
    twitterUsername: twitter,
    article,
  };

  return <Seo seo={seo} />;
}
