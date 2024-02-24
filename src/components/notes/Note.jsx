import React from "react";

import styled from "@emotion/styled";

import Linkify from "linkify-react";
import "linkify-plugin-hashtag";
import "linkify-plugin-mention";

import Anchor from "../Anchor";
import LinkOrImage from "./LinkOrImage";
import Hashtag from "./Hashtag";

import { convertUnixTimestampToDate, toISOString } from "../../utils";

const Content = styled.section`
  white-space: pre-wrap;
  word-wrap: break-word;
  margin: 0;
  & blockquote {
    margin: 1rem 0;
  }
`;

export default function Note({ note, onHashtag }) {
  const date = convertUnixTimestampToDate(note.created_at);

  const renderUrl = ({ attributes: { href, ...props }, content }) => (
    <LinkOrImage href={href} content={content} {...props} />
  );

  const renderHashtag = ({ content }) => (
    <Hashtag
      content={content}
      onHashtag={(hashtag) => onHashtag(hashtag, note.id)}
    />
  );

  const renderMention = ({ attributes: { href, ...props }, content }) => {
    if (content.startsWith("@note")) {
      return (
        <blockquote>
          <Anchor href={href} {...props}>
            {`${content.slice(1, 13)}...${content.slice(-8)}`}
          </Anchor>
        </blockquote>
      );
    }
    return (
      <Anchor href={href} {...props}>
        {`${content.slice(0, 13)}`}
      </Anchor>
    );
  };

  const linkifyOptions = {
    defaultProtocol: "https",
    formatHref: {
      mention: (href) => `nostr:${href.slice(1)}`,
    },
    render: {
      url: renderUrl,
      hashtag: renderHashtag,
      mention: renderMention,
    },
    validate: true,
  };

  return (
    <li>
      <hr />
      <small>
        <time dateTime={toISOString(date)}>{date}</time>
      </small>
      <Content>
        <Linkify options={linkifyOptions}>{note.content}</Linkify>
      </Content>
    </li>
  );
}
