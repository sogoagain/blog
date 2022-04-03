import React from "react";

import { Link } from "gatsby";

import styled from "@emotion/styled";

import { unit } from "../styles/styles";

const HeaderWrapper = styled.div({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
});

const Heading1 = styled.h1({
  flex: "auto",
});

const ProfileImage = styled.img({
  width: unit(4),
  height: unit(4),
});

const AboutWrapper = styled.div({
  display: "flex",
  alignItems: "center",
});

function Header({ title, profileImage, about }) {
  return (
    <HeaderWrapper>
      <Heading1>
        <Link to={title.to}>{title.text} </Link>
      </Heading1>
      <Link to={about.to}>
        <AboutWrapper>
          <ProfileImage src={profileImage.src} alt={profileImage.alt} />
          {about.text}
        </AboutWrapper>
      </Link>
    </HeaderWrapper>
  );
}

export default Header;
