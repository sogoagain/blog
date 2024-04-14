import React from "react";

import Anchor from "../Anchor";

import { isImageUrl, isVideoUrl } from "../../utils";

export default function MediaLink({ href, content, ...props }) {
  if (isImageUrl(href)) {
    return <img src={href} alt="Nostr 노트에서 불러온 이미지" {...props} />;
  }

  if (isVideoUrl(href)) {
    return (
      <video
        src={href}
        alt="Nostr 노트에서 불러온 비디오"
        controls
        {...props}
      />
    );
  }

  return (
    <Anchor href={href} {...props}>
      {content}
    </Anchor>
  );
}
