import React from "react";

import styled from "@emotion/styled";

import { graphql, useStaticQuery } from "gatsby";

import useScrambleTexts from "../hooks/useScrambleTexts";

const ScrambledText = styled.p`
  font-family: monospace;
`;

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

  return <ScrambledText>{scrambledText}</ScrambledText>;
}
