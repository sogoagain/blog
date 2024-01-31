import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { graphql, useStaticQuery } from "gatsby";

import Anchor from "../components/Anchor";
import NoteList from "../components/notes/NoteList";

import HashtagContainer from "./HashtagContainer";

import { subscribe, appendHashtag } from "../features/nostrSlice";

export const query = graphql`
  query {
    site {
      siteMetadata {
        social {
          nostr {
            nPubKey
            relays
          }
        }
      }
    }
  }
`;

export default function NostrContainer() {
  const {
    site: {
      siteMetadata: {
        social: {
          nostr: { nPubKey, relays },
        },
      },
    },
  } = useStaticQuery(query);

  const dispatch = useDispatch();
  const { pubkey, status, notes, selected } = useSelector(
    (state) => state.nostr,
  );

  const filteredNotes = selected.hashtag
    ? notes.filter((note) => selected.ids.includes(note.id))
    : notes;

  const handleHashtag = (hashtag, id) => {
    dispatch(appendHashtag({ hashtag, id }));
  };

  useEffect(() => {
    if (pubkey) {
      return;
    }
    dispatch(subscribe(relays, nPubKey));
  }, []);

  return (
    <>
      <p>
        <strong>
          <em>{status.content}</em>
        </strong>
        <br />
        from <Anchor href={`https://nostter.app/${nPubKey}`}>Nostr</Anchor>
      </p>
      <HashtagContainer />
      <NoteList notes={filteredNotes} onHashtag={handleHashtag} />
    </>
  );
}
