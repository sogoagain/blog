import React from "react";

import { Link } from "gatsby";

import styled from "@emotion/styled";

import { unit } from "../styles/styles";

const InfoWrapper = styled.div({
  display: "flex",
  flexDirection: "row",
  alignItems: "baseline",
  justifyContent: "center",
});

const CopyrightWrapper = styled.div({
  marginRight: unit(2),
  fontSize: unit(1.75),
});

const RssLinkWrapper = styled(Link)`
  font-size: ${unit(1.5)};
`;

const SocialLInksWrapper = styled.div({
  padding: unit(1),
  marginBottom: unit(1),
});

const SocialLinkWrapper = styled.a({
  margin: `0 ${unit(1)}`,
  fontSize: unit(1.5),
});

export default function Footer({ title, rss, social }) {
  const year = new Date().getFullYear();

  return (
    <footer>
      <InfoWrapper>
        <CopyrightWrapper>
          {title} &copy;{year}
        </CopyrightWrapper>
        <RssLinkWrapper to={rss}>RSS</RssLinkWrapper>
      </InfoWrapper>
      <SocialLInksWrapper>
        <SocialLinkWrapper href={`mailto:${social.email}`}>
          Email
        </SocialLinkWrapper>
        <SocialLinkWrapper
          href={social.github}
          target="_blank"
          rel="noreferrer"
        >
          GitHub
        </SocialLinkWrapper>
        <SocialLinkWrapper
          href={social.twitter}
          target="_blank"
          rel="noreferrer"
        >
          Twitter
        </SocialLinkWrapper>
        <SocialLinkWrapper
          href={social.linkedin}
          target="_blank"
          rel="noreferrer"
        >
          LinkedIn
        </SocialLinkWrapper>
      </SocialLInksWrapper>
    </footer>
  );
}
