import React from "react";

export default function PostItem({ title, subtitle, date }) {
  const datetime = new Date(date).toISOString();

  return (
    <li>
      <h2>{title}</h2>
      <h3>{subtitle}</h3>
      <time dateTime={datetime}>{date}</time>
    </li>
  );
}
