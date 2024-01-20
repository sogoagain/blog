import React from "react";

import { css } from "@emotion/react";

import Anchor from "../Anchor";

import BitcoinIcon from "../../images/hashtags/bitcoin.svg";
import NostrIcon from "../../images/hashtags/nostr.svg";
import ZapIcon from "../../images/hashtags/zap.svg";

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
  zap: <ZapIcon />,
  lightning: <ZapIcon />,
};

export default function Hashtag({ href, content, ...props }) {
  const tag = content.toLowerCase().slice(1);
  const iconKey = Object.keys(icons).find((key) => tag.includes(key));
  const icon = iconKey ? icons[iconKey] : null;

  return (
    <span css={style}>
      <Anchor href={href} {...props}>
        {content}
      </Anchor>
      {icon}
    </span>
  );
}
