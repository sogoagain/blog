import React from "react";

import styled from "@emotion/styled";

import Anchor from "./Anchor";
import IconImage from "./IconImage";

import { unit } from "../styles/styles";

const HeaderWrapper = styled.header({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
});

const Heading1 = styled.h1({
  fontSize: unit(2.5),
  flex: "auto",
});

const AboutWrapper = styled.div({
  fontSize: unit(2),
  display: "flex",
  alignItems: "center",
});

function Header({ title, profileImage, about }) {
  return (
    <HeaderWrapper>
      <Heading1>
        <Anchor to={title.to}>{title.text} </Anchor>
      </Heading1>
      <Anchor to={about.to}>
        <AboutWrapper>
          <IconImage src={profileImage.src} alt={profileImage.alt} level={4} />
          {about.text}
        </AboutWrapper>
      </Anchor>
    </HeaderWrapper>
  );
}

export default Header;
