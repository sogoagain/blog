import React from "react";

import { graphql, useStaticQuery } from "gatsby";

import ToolList from "../components/tools/ToolList";

const query = graphql`
  query {
    allToolsJson {
      nodes {
        title
        description
        link
      }
    }
  }
`;

export default function ToolsContainer() {
  const {
    allToolsJson: { nodes },
  } = useStaticQuery(query);

  return <ToolList tools={nodes} />;
}
