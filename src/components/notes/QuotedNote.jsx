import React from "react";

import Linkify from "linkify-react";
import "linkify-plugin-hashtag";
import "linkify-plugin-mention";

import Anchor from "../Anchor";
import DateTime from "../DateTime";

import { convertUnixTimestampToDate } from "../../utils";

export default function QuotedNote({ note, npub, author, linkifyOptions }) {
  const date = convertUnixTimestampToDate(note.created_at);

  return (
    <blockquote>
      <small>
        <DateTime dateTime={date} />{" "}
        <Anchor href={`nostr:${npub}`}>{author}</Anchor>
      </small>
      <br />
      <Linkify options={linkifyOptions}>{note.content}</Linkify>
    </blockquote>
  );
}
