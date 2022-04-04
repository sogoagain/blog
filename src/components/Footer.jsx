import { Link } from "gatsby";
import React from "react";

export default function Footer({ title, rss, social }) {
  const year = new Date().getFullYear();

  return (
    <footer>
      <div>
        {title} &copy;{year}
      </div>
      <Link to={rss}>RSS</Link>
      <Link to={social.email}>Email</Link>
      <Link to={social.github}>GitHub</Link>
      <Link to={social.twitter}>Twitter</Link>
      <Link to={social.linkedin}>LinkedIn</Link>
    </footer>
  );
}
