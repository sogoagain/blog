import React from "react";

import styled from "@emotion/styled";

import SocialLink from "./SocialLink";

import { unit } from "../styles/styles";

import EmailIcon from "../images/icons/email.png";
import GithubIcon from "../images/icons/github.png";
import LinkedinIcon from "../images/icons/linkedin.png";
import RssIcon from "../images/icons/rss.png";
import TwitterIcon from "../images/icons/twitter.png";

const CopyrightWrapper = styled.p({
  fontSize: unit(1.75),
  display: "flex",
  justifyContent: "center",
});

const LinksWrapper = styled.div({
  padding: unit(1),
});

const socialLink = {
  email: {
    href: (src) => `mailto:${src}`,
    title: "Email",
    icon: EmailIcon,
    blank: false,
  },
  github: {
    href: (src) => src,
    title: "GitHub",
    icon: GithubIcon,
    blank: true,
  },
  twitter: {
    href: (src) => src,
    title: "Twitter",
    icon: TwitterIcon,
    blank: true,
  },
  linkedin: {
    href: (src) => src,
    title: "LinkedIn",
    icon: LinkedinIcon,
    blank: true,
  },
  rss: {
    to: (src) => src,
    title: "RSS",
    icon: RssIcon,
    blank: false,
  },
};

export default function Footer({ title, rss, social }) {
  const link = {
    ...social,
    rss,
  };
  const year = new Date().getFullYear();

  return (
    <footer>
      <CopyrightWrapper>
        {title} &copy;{year}
      </CopyrightWrapper>
      <LinksWrapper>
        {Object.keys(link).map((name) => (
          <SocialLink key={name} link={link[name]} {...socialLink[name]} />
        ))}
      </LinksWrapper>
    </footer>
  );
}
