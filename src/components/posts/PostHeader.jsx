import React from "react";

import { yyyyMMddToISOString } from "../../utils";

export default function PostHeader({ title, subtitle, date }) {
  return (
    <header>
      <h1>{title}</h1>
      {subtitle && <h2>{subtitle}</h2>}
      {date && <time dateTime={yyyyMMddToISOString(date)}>{date}</time>}
    </header>
  );
}
