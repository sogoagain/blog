import React from "react";

import Anchor from "../Anchor";

function Header({ menus }) {
  const menuList = [];

  for (let i = 0; i < menus.length; i += 1) {
    const { text, to } = menus[i];
    menuList.push(
      <Anchor key={to} to={to}>
        {text}
      </Anchor>
    );
    if (i < menus.length - 1) {
      menuList.push(<span key={`separator-${i}`}> | </span>);
    }
  }

  return <nav>{menuList}</nav>;
}

export default Header;
