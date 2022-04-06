import React from "react";

import { yyyyMMddToISOString } from "../../utils";

export default function Post({ title, subtitle, date, html }) {
  return (
    <>
      <h1>{title}</h1>
      <h2>{subtitle}</h2>
      <h3>
        <time dateTime={yyyyMMddToISOString(date)}>{date}</time>
      </h3>
      <div
        data-testid="post-body-element"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </>
  );
}
