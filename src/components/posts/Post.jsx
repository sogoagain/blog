import React from "react";

import PostHeader from "./PostHeader";
import PostStyle from "./PostStyle";

export default function Post({ title, subtitle, date, html }) {
  return (
    <article>
      <PostHeader title={title} subtitle={subtitle} date={date} />
      <PostStyle html={html} />
    </article>
  );
}
