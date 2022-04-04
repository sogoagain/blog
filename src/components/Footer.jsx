import { Link } from "gatsby";
import React from "react";

export default function Footer({ title, rss }) {
  const year = new Date().getFullYear();

  return (
    <footer>
      {title} &copy;{year}
      <Link to={rss.to}>{rss.text}</Link>
    </footer>
  );
}
