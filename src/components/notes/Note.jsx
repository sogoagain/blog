import React from "react";

import styled from "@emotion/styled";

import Linkify from "linkify-react";
import "linkify-plugin-hashtag";

import LinkOrImage from "./LinkOrImage";
import Hashtag from "./Hashtag";

import { convertUnixTimestampToDate, toISOString } from "../../utils";

const Content = styled.p`
  white-space: pre-wrap;
  word-wrap: break-word;
  margin: 0;
`;

export default function Note({ note, onHashtag }) {
  const date = convertUnixTimestampToDate(note.created_at);
  const renderUrl = ({ attributes: { href, ...props }, content }) => (
    <LinkOrImage href={href} content={content} {...props} />
  );
  const renderHashtag = ({ attributes: { href, ...props }, content }) => (
    <Hashtag
      href={href}
      content={content}
      onHashtag={(hashtag) => onHashtag(hashtag, note.id)}
      {...props}
    />
  );
  const linkifyOptions = {
    defaultProtocol: "https",
    formatHref: (href, type) => {
      if (type === "hashtag") {
        return `https://nostter.app/search?q=${encodeURIComponent(href)}`;
      }
      return href;
    },
    render: {
      url: renderUrl,
      hashtag: renderHashtag,
    },
    validate: true,
  };

  return (
    <li>
      <small>
        <time dateTime={toISOString(date)}>{date}</time>
      </small>
      <Content>
        <Linkify options={linkifyOptions}>{note.content}</Linkify>
      </Content>
      <hr />
    </li>
  );
}
