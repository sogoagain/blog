import React from "react";

import DateTime from "../DateTime";

export default function PostHeader({ title, subtitle, date, description }) {
  return (
    <header>
      <h1>{title}</h1>
      {subtitle && <h2>{subtitle}</h2>}
      {date && <DateTime dateTime={date} />}
      {description && <p>{description}</p>}
    </header>
  );
}
