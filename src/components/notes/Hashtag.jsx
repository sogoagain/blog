import React from "react";

import styled from "@emotion/styled";

import { ReactComponent as BitcoinIcon } from "../../images/hashtags/bitcoin.svg";
import { ReactComponent as NostrIcon } from "../../images/hashtags/nostr.svg";
import { ReactComponent as ZapIcon } from "../../images/hashtags/zap.svg";

const HashtagWrapper = styled.span`
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

export default function Hashtag({ content }) {
  const tag = content.toLowerCase().slice(1);
  const iconKey = Object.keys(icons).find((key) => tag.includes(key));
  const icon = iconKey ? icons[iconKey] : null;

  return (
    <HashtagWrapper>
      {content}
      {icon}
    </HashtagWrapper>
  );
}
