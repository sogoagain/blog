import React from "react";

import { css } from "@emotion/react";

import Anchor from "../Anchor";

import BitcoinIcon from "../../images/hashtags/bitcoin.svg";
import NostrIcon from "../../images/hashtags/nostr.svg";

const style = css`
  svg {
    width: 1rem;
    height: 1rem;
    vertical-align: text-top;
  }
`;

const icons = {
  bitcoin: <BitcoinIcon />,
  nostr: <NostrIcon />,
};

export default function Hashtag({ href, content, ...props }) {
  const icon = icons[content.toLowerCase().slice(1)] || null;
  return (
    <span css={style}>
      <Anchor href={href} {...props}>
        {content}
      </Anchor>
      {icon}
    </span>
  );
}
