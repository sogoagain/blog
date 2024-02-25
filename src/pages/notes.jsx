import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { graphql } from "gatsby";

import LayoutContainer from "../container/LayoutContainer";
import SeoContainer from "../container/SeoContainer";
import NostrStatusContainer from "../container/NostrStatusContainer";
import NotesContainer from "../container/NotesContainer";
import NotesHashtagListContainer from "../container/NotesHashtagListContainer";

import { loadOwners } from "../features/nostrSlice";

export default function NotePage({
  data: {
    site: {
      siteMetadata: {
        social: {
          nostr: { npub, relays },
        },
      },
    },
  },
  location,
}) {
  const dispatch = useDispatch();
  const {
    owner: { pubkey },
  } = useSelector((state) => state.nostr);

  useEffect(() => {
    if (pubkey) {
      return;
    }
    dispatch(loadOwners(relays, npub));
  }, []);

  return (
    <LayoutContainer>
      <SeoContainer title="노트" pathname={location.pathname} />
      <h1>노트</h1>
      <NostrStatusContainer npub={npub} />
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
            npub
            relays
          }
        }
      }
    }
  }
`;
