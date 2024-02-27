import React from "react";

import { graphql, useStaticQuery } from "gatsby";

import Header from "../components/sections/Header";

const query = graphql`
  query {
    site {
      siteMetadata {
        link {
          rss
        }
      }
    }
  }
`;

export default function HeaderContainer({ pathname }) {
  const {
    site: {
      siteMetadata: {
        link: { rss },
      },
    },
  } = useStaticQuery(query);

  const menus = [
    { text: "포스트", to: "/" },
    { text: "노트", to: "/notes" },
    { text: "번역", to: "/translations" },
    { text: "독서", to: "/books" },
    { text: "소개", to: "/about" },
    { text: "RSS", to: rss },
  ];

  return <Header menus={menus} pathname={pathname} />;
}
