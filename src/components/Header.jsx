import React from "react";

import { Link } from "gatsby";

import styled from "@emotion/styled";

const HeaderWrapper = styled.header({
  padding: "1.6rem 1.6rem",
  height: "100%",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
});

const Heading1 = styled.h1({
  flex: "auto",
});

const ProfileImage = styled.img({
  width: "3.2rem",
  height: "3.2rem",
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
