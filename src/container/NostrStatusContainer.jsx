import React from "react";

import { useSelector } from "react-redux";

import Anchor from "../components/Anchor";

export default function NostrStatusContainer({ npub }) {
  const {
    events: { userStatus },
    owner: { status },
  } = useSelector((state) => state.nostr);

  const ownerStatusEvent = userStatus[status];
  const content = ownerStatusEvent ? ownerStatusEvent.content : "";

  return (
    <p>
      <strong>
        <em>{content}</em>
      </strong>
      <br />
      from <Anchor href={`nostr:${npub}`}>Nostr</Anchor>
    </p>
  );
}
