import React from "react";

import styled from "@emotion/styled";

import PostItem from "./PostItem";

const OrderedList = styled.ol({
  listStyle: "none",
});

export default function PostList({ posts, basePath }) {
  return (
    <OrderedList>
      {posts.map(({ slug, title, subtitle, date }) => (
        <PostItem
          key={slug}
          title={title}
          subtitle={subtitle}
          date={date}
          to={`${basePath}${slug}`}
        />
      ))}
    </OrderedList>
  );
}
