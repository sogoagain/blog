import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { graphql } from "gatsby";

import LayoutContainer from "../container/LayoutContainer";
import SeoContainer from "../container/SeoContainer";
import NostrStatusContainer from "../container/NostrStatusContainer";
import NotesContainer from "../container/NotesContainer";
import NotesHashtagListContainer from "../container/NotesHashtagListContainer";

import { subscribe } from "../features/nostrSlice";

export default function NotePage({
  data: {
    site: {
      siteMetadata: {
        social: {
          nostr: { nPubKey, relays },
        },
      },
    },
  },
  location,
}) {
  const dispatch = useDispatch();
  const { pubkey } = useSelector((state) => state.nostr);

  useEffect(() => {
    if (pubkey) {
      return;
    }
    dispatch(subscribe(relays, nPubKey));
  }, []);

  return (
    <LayoutContainer>
      <SeoContainer title="노트" pathname={location.pathname} />
      <h1>노트</h1>
      <NostrStatusContainer nPubKey={nPubKey} />
      <NotesHashtagListContainer />
      <NotesContainer />
    </LayoutContainer>
  );
}

export const noteQuery = graphql`
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
