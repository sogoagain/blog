import React from "react";

import Anchor from "../Anchor";

const normalizePath = (path) => path.replace(/\/$/, "");

function Header({ menus, pathname }) {
  const menuList = menus.flatMap(({ text, to }, i) => [
    normalizePath(pathname) === normalizePath(to) ? (
      <span key={`${to}-anchor`} aria-current="page">
        {text}
      </span>
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
