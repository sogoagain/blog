import React from "react";
import PropTypes from "prop-types";

import { Link } from "gatsby";

import styled from "@emotion/styled";

const HeaderWrapper = styled.header({
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "baseline",
});

const Heading1 = styled.h1({
  flex: "auto",
  marginTop: 0,
  marginBottom: 64,
  maxWidth: 640,
});

const ProfileImage = styled.img({
  width: "28px",
  height: "28px",
});

const AbountLink = styled(Link)`
  color: black;
`;

function Header({ title, profileImage, about }) {
  return (
    <HeaderWrapper>
      <Heading1>{title}</Heading1>
      <AbountLink to={about.to}>
        <ProfileImage src={profileImage.src} alt={profileImage.alt} />
        {about.title}
      </AbountLink>
    </HeaderWrapper>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  profileImage: PropTypes.shape({
    alt: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
  }).isRequired,
  about: PropTypes.shape({
    to: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default Header;
