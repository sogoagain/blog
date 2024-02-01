import React from "react";

import { useDispatch, useSelector } from "react-redux";

import TagList from "../components/tags/TagList";

import { toggleHashtag } from "../features/nostrSlice";

export default function NotesHashtagListContainer() {
  const dispatch = useDispatch();
  const { hashtags, selectedHashtag } = useSelector((state) => state.nostr);

  const tags = Object.keys(hashtags)
    .filter((hashtag) => hashtag !== "ETC")
    .sort();

  if (hashtags.ETC) {
    tags.push("ETC");
  }

  const handleClick = (hashtag) => {
    dispatch(toggleHashtag(hashtag));
  };

  return (
    <TagList tags={tags} selected={selectedHashtag} onClick={handleClick} />
  );
}
