import React from "react";

import { graphql } from "gatsby";

import Anchor from "../components/Anchor";

import LayoutContainer from "../container/LayoutContainer";
import SeoContainer from "../container/SeoContainer";
import NostrContainer from "../container/NostrContainer";

export default function NotePage({
  data: {
    site: {
      siteMetadata: {
        social: {
          nostr: { nPubKey },
        },
      },
    },
  },
  location,
}) {
  return (
    <LayoutContainer>
      <SeoContainer title="노트" pathname={location.pathname} />
      <h1>노트</h1>
      <p>
        <strong>
          from <Anchor href={`https://nostter.app/${nPubKey}`}>Nostr</Anchor>
        </strong>
      </p>
      <NostrContainer />
    </LayoutContainer>
  );
}

export const noteQuery = graphql`
  query {
    site {
      siteMetadata {
        social {
          github
          email
          nostr {
            nPubKey
          }
        }
      }
    }
  }
`;
