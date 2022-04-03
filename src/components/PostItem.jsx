import React from "react";

import { Link } from "gatsby";

export default function PostItem({ title, subtitle, date, to }) {
  const datetime = new Date(date).toISOString();

  return (
    <li>
      <Link to={to}>
        <h2>{title}</h2>
        <h3>{subtitle}</h3>
        <time dateTime={datetime}>{date}</time>
      </Link>
    </li>
  );
}
