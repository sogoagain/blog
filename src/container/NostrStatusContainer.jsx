import React from "react";

import { useSelector } from "react-redux";

export default function NostrStatusContainer() {
  const {
    events: { userStatus },
    owner: { status },
  } = useSelector((state) => state.nostr);

  const ownerStatusEvent = userStatus[status];
  const content = ownerStatusEvent ? ownerStatusEvent.content : "";

  return <p>{content}</p>;
}
