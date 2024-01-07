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

export default function HeaderContainer() {
  const {
    site: {
      siteMetadata: {
        link: { rss },
      },
    },
  } = useStaticQuery(query);

  const menus = [
    { text: "홈", to: "/" },
    { text: "노트", to: "/note" },
    { text: "독서", to: "/books" },
    { text: "프로젝트", to: "/projects" },
    {
      text: "비트코인",
      to: "/bitcoin",
    },
    {
      text: "소개",
      to: "/about",
    },
    { text: "RSS", to: rss },
  ];

  return <Header menus={menus} />;
}
