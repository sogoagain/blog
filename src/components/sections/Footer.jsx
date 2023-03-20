import React from "react";

import Anchor from "../Anchor";

export default function Footer({ title, links }) {
  const year = new Date().getFullYear();

  const linkList = [];

  for (let i = 0; i < links.length; i += 1) {
    const { text, href, to } = links[i];
    linkList.push(
      <Anchor key={href || to} href={href} to={to}>
        {text}
      </Anchor>
    );
    if (i < links.length - 1) {
      linkList.push(<span key={`separator-${i}`}> | </span>);
    }
  }

  return (
    <footer role="contentinfo">
      <span>
        <Anchor to="#">↑ 처음으로</Anchor>
        <br />
        <br />
      </span>
      <small>
        {linkList}
        <br />
        <span>
          {title} &copy;{year}
        </span>
      </small>
    </footer>
  );
}
