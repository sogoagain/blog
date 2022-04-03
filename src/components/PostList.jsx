import React from "react";
import PostItem from "./PostItem";

export default function PostList({ posts, basePath }) {
  return (
    <ol>
      {posts.map(({ slug, title, subtitle, date }) => (
        <PostItem
          key={slug}
          title={title}
          subtitle={subtitle}
          date={date}
          to={`${basePath}${slug}`}
        />
      ))}
    </ol>
  );
}
