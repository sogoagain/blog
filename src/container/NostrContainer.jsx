import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { graphql, useStaticQuery } from "gatsby";

import NoteList from "../components/notes/NoteList";

import { subscribe } from "../features/nostrSlice";

export const query = graphql`
  query {
    site {
      siteMetadata {
        social {
          nostr {
            nPubKey
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
          nostr: { nPubKey },
        },
      },
    },
  } = useStaticQuery(query);
  const dispatch = useDispatch();
  const { pubkey, notes } = useSelector((state) => state.nostr);

  useEffect(() => {
    if (pubkey) {
      return;
    }
    dispatch(subscribe(nPubKey));
  }, []);

  return <NoteList notes={notes} />;
}
