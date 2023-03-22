import React from "react";

import { graphql, useStaticQuery } from "gatsby";

import useScrambleTexts from "../hooks/useScrambleTexts";

const query = graphql`
  query {
    site {
      siteMetadata {
        interests
      }
    }
  }
`;

export default function InterestsContainer() {
  const {
    site: {
      siteMetadata: { interests },
    },
  } = useStaticQuery(query);

  const scrambledText = useScrambleTexts(interests);

  return (
    <strong>
      <code>{scrambledText}</code>
    </strong>
  );
}
