import React from "react";

import styled from "@emotion/styled";

import Anchor from "../Anchor";
import IconLink from "../IconLink";

import { color, unit } from "../../styles";

import AccountIcon from "../../images/icons/account.png";
import BitcoinIcon from "../../images/icons/bitcoin.png";

const HeaderWrapper = styled.header({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
});

const TitleAnchor = styled(Anchor)`
  color: ${color.brand};
`;

const LinksWrapper = styled.div({
  display: "flex",
  alignItems: "center",
  minHeight: unit(4),
});

const Heading1 = styled.h1({
  flex: "auto",
  fontFamily: "D2Coding, monospace",
  fontSize: unit(3),
});

function getLink(link, icon) {
  return {
    ...link,
    toFn: (src) => src,
    icon: { src: icon, level: 3 },
    blank: false,
  };
}

function Header({ title, links }) {
  const profileImage = links.about.image ? links.about.image : AccountIcon;
  const pageLink = {
    support: getLink(links.support, BitcoinIcon),
    about: getLink(links.about, profileImage),
  };

  return (
    <HeaderWrapper>
      <Heading1>
        <TitleAnchor to={title.to}>{title.text}</TitleAnchor>
      </Heading1>
      <LinksWrapper>
        {Object.keys(pageLink).map((name) => (
          <IconLink key={name} {...pageLink[name]} />
        ))}
      </LinksWrapper>
    </HeaderWrapper>
  );
}

export default Header;
