import React from "react";

import styled from "@emotion/styled";

import PostItem from "./PostItem";

const List = styled.ol`
  list-style: none;
  padding-left: 0;
`;

export default function PostList({ posts, basePath }) {
  return (
    <List>
      {posts.map(({ slug, title, subtitle, date }) => (
        <PostItem
          key={slug}
          title={title}
          subtitle={subtitle}
          date={date}
          to={`${basePath}${slug}`}
        />
      ))}
    </List>
  );
}
