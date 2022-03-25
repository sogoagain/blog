import React from "react";
import PropTypes from "prop-types";

import { Link } from "gatsby";

function Header({ title, profileImage, about }) {
  return (
    <header>
      <h1>{title}</h1>
      <img src={profileImage.src} alt={profileImage.alt} />
      <Link to={about.to}>{about.title}</Link>
    </header>
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
