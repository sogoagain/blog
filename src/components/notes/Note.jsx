import React from "react";

import styled from "@emotion/styled";

import Linkify from "linkify-react";
import "linkify-plugin-hashtag";
import "linkify-plugin-mention";

import Anchor from "../Anchor";
import LinkOrImage from "./LinkOrImage";
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

export default function Note({ note, profiles, quotes, onHashtag }) {
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
    function getProfileName(nPubKey) {
      const profile = profiles[nPubKey];
      let result = `${nPubKey.slice(0, 12)}`;
      if (profile) {
        if (profile.display_name) {
          result = profile.display_name;
        } else if (profile.name) {
          result = profile.name;
        }
      }
      return result;
    }

    if (content.startsWith("@note")) {
      const quote = quotes[content.slice(1)];
      if (quote) {
        return (
          <QuotedNote
            quote={quote}
            writer={getProfileName(quote.nPubKey)}
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
    <li>
      <hr />
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
    </li>
  );
}
