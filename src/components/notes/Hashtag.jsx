import React, { useEffect } from "react";

import { css } from "@emotion/react";

import { ReactComponent as BitcoinIcon } from "../../images/hashtags/bitcoin.svg";
import { ReactComponent as NostrIcon } from "../../images/hashtags/nostr.svg";
import { ReactComponent as ZapIcon } from "../../images/hashtags/zap.svg";

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

export default function Hashtag({ content, onHashtag }) {
  const tag = content.toLowerCase().slice(1);
  const iconKey = Object.keys(icons).find((key) => tag.includes(key));
  const icon = iconKey ? icons[iconKey] : null;

  useEffect(() => {
    onHashtag(content);
  }, []);

  return (
    <span css={style}>
      {content}
      {icon}
    </span>
  );
}
