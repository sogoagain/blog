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

export default function TagListContainer() {
  const {
    allMarkdownRemark: { nodes },
  } = useStaticQuery(query);

  const tags = [
    ...new Set(
      nodes.flatMap((node) => {
        if (node.frontmatter.tags) {
          return node.frontmatter.tags.split(",").map((tag) => tag.trim());
        }
        return [];
      })
    ),
  ];

  const [selectedTags, setSelectedTags] = useState([]);

  const handleClick = (tag) => {
    setSelectedTags((prevSelectedTags) =>
      prevSelectedTags.includes(tag)
        ? prevSelectedTags.filter((t) => t !== tag)
        : [...prevSelectedTags, tag]
    );
  };

  return (
    <div>
      {tags.map((tag) => (
        <Tag
          key={`tag-${tag}`}
          text={tag}
          selected={selectedTags.includes(tag)}
          handleClick={() => handleClick(tag)}
        />
      ))}
    </div>
  );
}
