import React from "react";

import { useSelector } from "react-redux";

import TagList from "../components/tags/TagList";

export default function HashtagContainer() {
  const { hashtags } = useSelector((state) => state.nostr);

  const tags = [...Object.keys(hashtags).sort(), "ETC"];

  return <TagList tags={tags} selected={null} onClick={() => {}} />;
}
