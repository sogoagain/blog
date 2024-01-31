import React from "react";

import { useDispatch, useSelector } from "react-redux";

import TagList from "../components/tags/TagList";

import { toggleHashtag } from "../features/nostrSlice";

export default function HashtagContainer() {
  const dispatch = useDispatch();
  const { hashtags, selected } = useSelector((state) => state.nostr);

  const tags = Object.keys(hashtags)
    .filter((hashtag) => hashtag !== "ETC")
    .sort()
    .concat("ETC");

  const handleClick = (hashtag) => {
    dispatch(toggleHashtag(hashtag));
  };

  return (
    <TagList tags={tags} selected={selected.hashtag} onClick={handleClick} />
  );
}
