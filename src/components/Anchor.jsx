import React from "react";

import { Link } from "gatsby";

export default function Anchor({ href, to, children, ...rest }) {
  if (href) {
    return (
      <a href={href} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <Link to={to} {...rest}>
      {children}
    </Link>
  );
}
