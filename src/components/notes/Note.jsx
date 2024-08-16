import React from "react";

import styled from "@emotion/styled";

import { nip19 } from "nostr-tools";

import Linkify from "linkify-react";
import "linkify-plugin-hashtag";
import "linkify-plugin-mention";

import Anchor from "../Anchor";
import DividedListItem from "../DividedListItem";
import MediaLink from "./MediaLink";
import Hashtag from "./Hashtag";
import QuotedNote from "./QuotedNote";

import { convertUnixTimestampToDate, toISOString } from "../../utils";

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
  const NIP19_ID_LENGTH = 63;

  const linkifyOptions = ({ render }) => ({
    defaultProtocol: "https",
    formatHref: {
      mention: (href) => `nostr:${href.slice(1, NIP19_ID_LENGTH + 1)}`,
    },
    render: {
      ...render,
    },
    validate: true,
  });

  const renderUrl = ({ attributes: { href, ...props }, content }) => (
    <MediaLink href={href} content={content} {...props} />
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

    const reference = content.slice(1, NIP19_ID_LENGTH + 1);
    const remainingText = content.slice(reference.length + 1);
    if (reference.startsWith("note")) {
      const { data: id } = nip19.decode(reference);
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
            {`${reference.slice(0, 12)}...${reference.slice(-8)}`}
          </Anchor>
          {remainingText}
        </blockquote>
      );
    }
    return (
      <>
        <Anchor href={href} {...props}>
          {`@${getProfileName(reference)}`}
        </Anchor>
        {remainingText}
      </>
    );
  };

  return (
    <DividedListItem>
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
    </DividedListItem>
  );
}
