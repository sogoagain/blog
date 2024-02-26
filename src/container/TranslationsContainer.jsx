import React from "react";

import { graphql, useStaticQuery } from "gatsby";

import TranslationList from "../components/translations/TranslationList";

const query = graphql`
  query {
    allTranslationsJson(sort: { date: DESC }) {
      nodes {
        date
        title
        author
        source
        link
      }
    }
  }
`;

export default function TranslationsContainer() {
  const {
    allTranslationsJson: { nodes },
  } = useStaticQuery(query);

  return <TranslationList translations={nodes} />;
}
