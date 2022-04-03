import React, { useState, useEffect } from "react";

import { graphql, useStaticQuery } from "gatsby";

import PostList from "../components/PostList";

export default function PostsContainer() {
  const {
    allMarkdownRemark: { nodes },
  } = useStaticQuery(graphql`
    query {
      allMarkdownRemark(sort: { fields: frontmatter___date, order: DESC }) {
        nodes {
          frontmatter {
            date
            subtitle
            title
          }
          fields {
            slug
          }
        }
      }
    }
  `);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    setPosts(
      nodes.map(({ frontmatter, fields }) => ({
        ...frontmatter,
        ...fields,
      }))
    );
  }, [nodes]);

  return <PostList posts={posts} basePath="/posts" />;
}
