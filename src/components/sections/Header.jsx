import React from "react";

import styled from "@emotion/styled";

import Anchor from "../Anchor";
import IconImage from "../IconImage";

import { color, unit } from "../../styles";

const HeaderWrapper = styled.header({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
});

const TitleAnchor = styled(Anchor)`
  color: ${color.brand};
`;

const AboutAnchor = styled(Anchor)`
  display: flex;
  align-items: center;
  min-height: ${unit(4)};
`;

const Heading1 = styled.h1({
  flex: "auto",
  fontFamily: "D2Coding, monospace",
  fontSize: unit(3),
});

function Header({ title, profileImage, about }) {
  return (
    <HeaderWrapper>
      <Heading1>
        <TitleAnchor to={title.to}>{title.text}</TitleAnchor>
      </Heading1>
      <AboutAnchor href={about.href} target="_blank" rel="noreferrer">
        {profileImage.src ? (
          <IconImage src={profileImage.src} alt={profileImage.alt} level={4} />
        ) : null}
        {about.text}
      </AboutAnchor>
    </HeaderWrapper>
  );
}

export default Header;
