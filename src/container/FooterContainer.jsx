import React from "react";

import { graphql, useStaticQuery } from "gatsby";

import Footer from "../components/Footer";

export default function FooterContainer() {
  const {
    site: {
      siteMetadata: { title, rss, social },
    },
  } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          rss
          social {
            github
            twitter
            linkedin
            email
          }
        }
      }
    }
  `);

  const socialLink = {
    email: social.email,
    github: `https://github.com/${social.github}`,
    twitter: `https://twitter.com/${social.twitter}`,
    linkedin: `https://www.linkedin.com/in/${social.linkedin}`,
  };

  return <Footer title={title} rss={rss} social={socialLink} />;
}
