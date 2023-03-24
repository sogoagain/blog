import React, { useState } from "react";

import { graphql, useStaticQuery } from "gatsby";

import Tag from "../components/Tag";

const query = graphql`
  query {
    allMarkdownRemark {
      nodes {
        frontmatter {
          tags
        }
      }
    }
  }
`;

function getUniqueTags(nodes) {
  return [
    ...new Set(
      nodes.flatMap((node) =>
        node.frontmatter.tags
          ? node.frontmatter.tags.split(",").map((tag) => tag.trim())
          : []
      )
    ),
  ].sort((a, b) => a.localeCompare(b));
}

function toggleTag(selectedTag, tag) {
  return selectedTag === tag ? null : tag;
}

export default function TagListContainer() {
  const {
    allMarkdownRemark: { nodes },
  } = useStaticQuery(query);

  const tags = getUniqueTags(nodes);
  const [selectedTag, setSelectedTag] = useState([]);

  const handleClick = (tag) => setSelectedTag(toggleTag(selectedTag, tag));

  return (
    <div>
      {tags.map((tag) => (
        <Tag
          key={`tag-${tag}`}
          text={tag}
          selected={selectedTag === tag}
          handleClick={() => handleClick(tag)}
        />
      ))}
    </div>
  );
}
