import React from "react";

import Linkify from "linkify-react";
import "linkify-plugin-hashtag";
import "linkify-plugin-mention";

import Anchor from "../Anchor";

import { convertUnixTimestampToDate, toISOString } from "../../utils";

export default function QuotedNote({ note, npub, author, linkifyOptions }) {
  const date = convertUnixTimestampToDate(note.created_at);

  return (
    <blockquote>
      <small>
        <time dateTime={toISOString(date)}>{date}</time>{" "}
        <em>
          <Anchor href={`nostr:${npub}`}>{author}</Anchor>
        </em>
      </small>
      <br />
      <Linkify options={linkifyOptions}>{note.content}</Linkify>
    </blockquote>
  );
}
