import React from "react";

import Anchor from "../Anchor";

function Header({ menus }) {
  const menuList = menus.flatMap(({ text, to }, i) => [
    <Anchor key={`${to}-anchor`} to={to}>
      {text}
    </Anchor>,
    i < menus.length - 1 ? <span key={`${to}-separator`}> | </span> : null,
  ]);

  return <nav>{menuList}</nav>;
}

export default Header;
