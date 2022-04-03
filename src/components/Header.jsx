import React from "react";

import { Link } from "gatsby";

import styled from "@emotion/styled";

import { unit } from "../styles/styles";

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
    <>
      <Heading1>
        <Link to={title.to}>{title.text} </Link>
      </Heading1>
      <Link to={about.to}>
        <AboutWrapper>
          <ProfileImage src={profileImage.src} alt={profileImage.alt} />
          {about.text}
        </AboutWrapper>
      </Link>
    </>
  );
}

export default Header;
