import React from "react";

import styled from "@emotion/styled";

import IconLink from "../IconLink";

import { unit } from "../../styles";

import EmailIcon from "../../images/icons/email.png";
import GithubIcon from "../../images/icons/github.png";
import RssIcon from "../../images/icons/rss.png";
import TwitterIcon from "../../images/icons/twitter.png";
import NostrIcon from "../../images/icons/nostr.jpeg";

const CopyrightWrapper = styled.p({
  display: "flex",
  justifyContent: "center",
  margin: unit(1),
});

const LinksWrapper = styled.div({
  padding: unit(1),
});

const socialLink = {
  email: {
    hrefFn: (src) => `mailto:${src}`,
    title: "Email",
    icon: { src: EmailIcon, level: 2 },
    blank: false,
  },
  github: {
    hrefFn: (src) => src,
    title: "GitHub",
    icon: { src: GithubIcon, level: 2 },
    blank: true,
  },
  twitter: {
    hrefFn: (src) => src,
    title: "Twitter",
    icon: { src: TwitterIcon, level: 2 },
    blank: true,
  },
  nostr: {
    hrefFn: (src) => src,
    title: "Nostr",
    icon: { src: NostrIcon, level: 2 },
    blank: true,
  },
  rss: {
    toFn: (src) => src,
    title: "RSS",
    icon: { src: RssIcon, level: 2 },
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
