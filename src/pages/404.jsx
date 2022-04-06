import React from "react";

import { Link } from "gatsby";

import LayoutContainer from "../container/LayoutContainer";

const pageStyles = {
  color: "#232129",
  padding: "96px",
};

const headingStyles = {
  marginTop: 0,
  marginBottom: 64,
  maxWidth: 320,
};

const paragraphStyles = {
  marginBottom: 48,
};

function NotFoundPage() {
  return (
    <LayoutContainer>
      <div style={pageStyles}>
        <title>Not found</title>
        <h1 style={headingStyles}>Page not found</h1>
        <p style={paragraphStyles}>
          Sorry{" "}
          <span role="img" aria-label="Pensive emoji">
            😔
          </span>{" "}
          we couldn’t find what you were looking for.
          <br />
          <Link to="/">Go home</Link>.
        </p>
      </div>
    </LayoutContainer>
  );
}

export default NotFoundPage;
