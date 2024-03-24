import React from "react";

import styled from "@emotion/styled";

import { nip19 } from "nostr-tools";

import Linkify from "linkify-react";
import "linkify-plugin-hashtag";
import "linkify-plugin-mention";

import Anchor from "../Anchor";
import LinkOrImage from "./LinkOrImage";
import Hashtag from "./Hashtag";
import QuotedNote from "./QuotedNote";

import { convertUnixTimestampToDate, toISOString } from "../../utils";

const ListItem = styled.li`
  padding: 2rem 0;
  border-bottom: 1px dashed grey;
  &:first-child {
    padding-top: 0;
  }
  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }
`;

const Content = styled.section`
  white-space: pre-wrap;
  word-wrap: break-word;
  margin: 0;
  & blockquote {
    margin: 1rem 0;
  }
`;

export default function Note({ note, events, onHashtag }) {
  const date = convertUnixTimestampToDate(note.created_at);

  const linkifyOptions = ({ render }) => ({
    defaultProtocol: "https",
    formatHref: {
      mention: (href) => `nostr:${href.slice(1)}`,
    },
    render: {
      ...render,
    },
    validate: true,
  });

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
    function getProfileName(npub) {
      const { data: pubkey } = nip19.decode(npub);
      const profile = events.metadata[pubkey];
      let result = `${npub.slice(0, 12)}`;
      if (profile) {
        if (profile.content.display_name) {
          result = profile.content.display_name;
        } else if (profile.content.name) {
          result = profile.content.name;
        }
      }
      return result;
    }

    if (content.startsWith("@note")) {
      const { data: id } = nip19.decode(content.slice(1));
      const quote = events.textNote[id];
      if (quote) {
        const npub = nip19.npubEncode(quote.pubkey);
        return (
          <QuotedNote
            note={quote}
            npub={npub}
            author={getProfileName(npub)}
            linkifyOptions={linkifyOptions({
              render: {
                url: renderUrl,
                hashtag: renderHashtag,
                mention: renderMention,
              },
            })}
          />
        );
      }
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
        {`@${getProfileName(content.slice(1))}`}
      </Anchor>
    );
  };

  return (
    <ListItem>
      <small>
        <time dateTime={toISOString(date)}>{date}</time>
      </small>
      <Content>
        <Linkify
          options={linkifyOptions({
            render: {
              url: renderUrl,
              hashtag: renderHashtag,
              mention: renderMention,
            },
          })}
        >
          {note.content}
        </Linkify>
      </Content>
    </ListItem>
  );
}
