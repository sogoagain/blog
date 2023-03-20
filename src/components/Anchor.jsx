import React from "react";

import { Link } from "gatsby";

import { OutboundLink } from "gatsby-plugin-google-gtag";

export default function Anchor({ href, to, children, ...rest }) {
  if (href) {
    return (
      <OutboundLink href={href} target="_blank" rel="noreferrer" {...rest}>
        {children}
      </OutboundLink>
    );
  }
  return (
    <Link to={to} {...rest}>
      {children}
    </Link>
  );
}
