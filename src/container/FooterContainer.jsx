import React from "react";

import { graphql, useStaticQuery } from "gatsby";

import styled from "@emotion/styled";

import Footer from "../components/sections/Footer";

import { unit } from "../styles";

const FooterSection = styled.div({
  display: "flex",
  justifyContent: "center",
  padding: unit(2),
});

const query = graphql`
  query {
    site {
      siteMetadata {
        title
        social {
          github
          twitter
          linkedin
          email
        }
        link {
          rss
        }
      }
    }
  }
`;

export default function FooterContainer() {
  const {
    site: {
      siteMetadata: {
        title,
        social,
        link: { rss },
      },
    },
  } = useStaticQuery(query);

  const socialLink = {
    email: social.email,
    github: `https://github.com/${social.github}`,
    twitter: `https://twitter.com/${social.twitter}`,
    linkedin: `https://www.linkedin.com/in/${social.linkedin}`,
  };

  return (
    <FooterSection>
      <Footer title={title} rss={rss} social={socialLink} />
    </FooterSection>
  );
}
