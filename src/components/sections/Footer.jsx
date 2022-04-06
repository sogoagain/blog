import React from "react";

import styled from "@emotion/styled";

import IconLink from "../IconLink";

import { unit } from "../../styles";

import EmailIcon from "../../images/icons/email.png";
import GithubIcon from "../../images/icons/github.png";
import LinkedinIcon from "../../images/icons/linkedin.png";
import RssIcon from "../../images/icons/rss.png";
import TwitterIcon from "../../images/icons/twitter.png";

const CopyrightWrapper = styled.p({
  display: "flex",
  justifyContent: "center",
  fontSize: unit(1.75),
});

const LinksWrapper = styled.div({
  padding: unit(1),
});

const socialLink = {
  email: {
    hrefFn: (src) => `mailto:${src}`,
    title: "Email",
    icon: EmailIcon,
    blank: false,
  },
  github: {
    hrefFn: (src) => src,
    title: "GitHub",
    icon: GithubIcon,
    blank: true,
  },
  twitter: {
    hrefFn: (src) => src,
    title: "Twitter",
    icon: TwitterIcon,
    blank: true,
  },
  linkedin: {
    hrefFn: (src) => src,
    title: "LinkedIn",
    icon: LinkedinIcon,
    blank: true,
  },
  rss: {
    toFn: (src) => src,
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
          <IconLink key={name} link={link[name]} {...socialLink[name]} />
        ))}
      </LinksWrapper>
    </footer>
  );
}
