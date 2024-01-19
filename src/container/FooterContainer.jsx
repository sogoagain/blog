import React from "react";

import { graphql, useStaticQuery } from "gatsby";

import Footer from "../components/sections/Footer";

const query = graphql`
  query {
    site {
      siteMetadata {
        title
        social {
          github
          email
          nostr {
            name
            nPubKey
          }
        }
      }
    }
  }
`;

export default function FooterContainer() {
  const {
    site: {
      siteMetadata: { title, social },
    },
  } = useStaticQuery(query);

  const links = [
    {
      text: "Email",
      href: `mailto:${social.email}`,
    },
    {
      text: "GitHub",
      href: `https://github.com/${social.github}`,
    },
    {
      text: "Nostr",
      href: `https://nostter.app/${social.nostr.nPubKey}`,
    },
  ];

  return <Footer title={title} links={links} />;
}
