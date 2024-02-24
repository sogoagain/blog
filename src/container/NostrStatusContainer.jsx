import React from "react";

import { useSelector } from "react-redux";

import Anchor from "../components/Anchor";

export default function NostrStatusContainer({ nPubKey }) {
  const { status } = useSelector((state) => state.nostr);

  return (
    <p>
      <strong>
        <em>{status.content}</em>
      </strong>
      <br />
      from <Anchor href={`nostr:${nPubKey}`}>Nostr</Anchor>
    </p>
  );
}
