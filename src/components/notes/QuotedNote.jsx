import React from "react";

import Linkify from "linkify-react";
import "linkify-plugin-hashtag";
import "linkify-plugin-mention";

import Anchor from "../Anchor";

import { convertUnixTimestampToDate, toISOString } from "../../utils";

export default function QuotedNote({ quote, writer, linkifyOptions }) {
  const date = convertUnixTimestampToDate(quote.created_at);

  return (
    <blockquote>
      <small>
        <time dateTime={toISOString(date)}>{date}</time>
      </small>
      <br />
      <em>
        {"Authored by "}
        <Anchor href={`nostr:${quote.nPubKey}`}>{writer}</Anchor>
      </em>
      <br />
      <br />
      <Linkify options={linkifyOptions}>{quote.content}</Linkify>
    </blockquote>
  );
}
