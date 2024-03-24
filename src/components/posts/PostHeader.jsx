import React from "react";

import { toISOString } from "../../utils";

export default function PostHeader({ title, subtitle, date, description }) {
  return (
    <header>
      <h1>{title}</h1>
      {subtitle && <h2>{subtitle}</h2>}
      {date && <time dateTime={toISOString(date)}>{date}</time>}
      {description && <p>{description}</p>}
    </header>
  );
}
