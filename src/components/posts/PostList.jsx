import React from "react";

import PostItem from "./PostItem";

import UnstyledOrderedList from "../UnstyledOrderedList";

export default function PostList({ posts, basePath }) {
  if (posts.length === 0) {
    return <p>포스트가 없습니다.</p>;
  }

  return (
    <UnstyledOrderedList>
      {posts.map(({ slug, title, subtitle, date }) => (
        <PostItem
          key={slug}
          title={title}
          subtitle={subtitle}
          date={date}
          to={`${basePath}${slug}`}
        />
      ))}
    </UnstyledOrderedList>
  );
}
