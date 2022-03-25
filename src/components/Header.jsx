import React from "react";
import PropTypes from "prop-types";

function Header({ title, profileImage }) {
  return (
    <header>
      <h1>{title}</h1>
      <img src={profileImage.src} alt={profileImage.alt} />
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  profileImage: PropTypes.shape({
    alt: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
  }).isRequired,
};

export default Header;
