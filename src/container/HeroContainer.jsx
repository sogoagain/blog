import React from "react";

import { graphql, useStaticQuery } from "gatsby";

import Hero from "../components/sections/Hero";

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

export default function HeroContainer() {
  const {
    site: {
      siteMetadata: { interests },
    },
  } = useStaticQuery(query);

  const scrambledText = useScrambleTexts(interests);

  return <Hero text={scrambledText} />;
}
