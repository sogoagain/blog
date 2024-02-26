import React from "react";

import Anchor from "../Anchor";

function Header({ menus, pathname }) {
  const normalizePath = (path) => path.replace(/\/$/, "");

  const menuList = menus.flatMap(({ text, to }, i) => [
    normalizePath(pathname) === normalizePath(to) ? (
      <span key={`${to}-anchor`}>{text}</span>
    ) : (
      <Anchor key={`${to}-anchor`} to={to}>
        {text}
      </Anchor>
    ),
    i < menus.length - 1 ? <span key={`${to}-separator`}> | </span> : null,
  ]);

  return <nav>{menuList}</nav>;
}

export default Header;
