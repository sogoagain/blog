import React from "react";

import Anchor from "../Anchor";

import { isImageUrl } from "../../utils";

export default function LinkOrImage({ href, content, ...props }) {
  if (isImageUrl(href)) {
    return <img src={href} alt="Nostr 노트에서 불러온 이미지" {...props} />;
  }
  return (
    <Anchor href={href} {...props}>
      {content}
    </Anchor>
  );
}
