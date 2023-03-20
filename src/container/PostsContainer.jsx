import React, { useState, useEffect } from "react";

import { graphql, useStaticQuery } from "gatsby";

import PostList from "../components/posts/PostList";

const query = graphql`
  query {
    allMarkdownRemark(
      sort: { fields: frontmatter___date, order: DESC }
      filter: { fileAbsolutePath: { regex: "/(posts)/" } }
    ) {
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
`;

export default function PostsContainer() {
  const {
    allMarkdownRemark: { nodes },
  } = useStaticQuery(query);

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
