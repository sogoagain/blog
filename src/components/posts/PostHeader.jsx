import React from "react";

import { yyyyMMddToISOString } from "../../utils";

export default function PostHeader({ title, subtitle, date }) {
  return (
    <header>
      <h1>{title}</h1>
      {subtitle && <p>{subtitle}</p>}
      {date && <time dateTime={yyyyMMddToISOString(date)}>{date}</time>}
    </header>
  );
}
