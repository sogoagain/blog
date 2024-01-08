import React from "react";

import styled from "@emotion/styled";

import Linkify from "linkify-react";
import "linkify-plugin-hashtag";

import Anchor from "../Anchor";

import { convertUnixTimestampToDate, toISOString } from "../../utils";

const Content = styled.p`
  white-space: pre-wrap;
  word-wrap: break-word;
  margin: 0;
`;

export default function Note({ note }) {
  const date = convertUnixTimestampToDate(note.created_at);
  const linkifyOptions = {
    defaultProtocol: "https",
    formatHref: (href, type) => {
      if (type === "hashtag") {
        return `https://snort.social/t/${href.substring(1)}`;
      }
      return href;
    },
    render: ({ attributes, content }) => {
      const { href, ...props } = attributes;
      return (
        <Anchor href={href} {...props}>
          {content}
        </Anchor>
      );
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
