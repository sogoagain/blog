import React from "react";

import { useDispatch, useSelector } from "react-redux";

import TagList from "../components/tags/TagList";

import { toggleHashtag } from "../features/nostrSlice";

export default function NotesHashtagListContainer() {
  const dispatch = useDispatch();
  const {
    hashtag: { tags, selected },
  } = useSelector((state) => state.nostr);

  const sortedTags = Object.entries(tags)
    .filter(([hashtag]) => hashtag !== "ETC")
    .sort(([aHashtag, aIds], [bHashtag, bIds]) => {
      const totalCountDiff = bIds.length - aIds.length;
      return totalCountDiff === 0
        ? aHashtag.localeCompare(bHashtag, "ko")
        : totalCountDiff;
    })
    .map(([hashtag]) => hashtag);

  if (tags.ETC) {
    sortedTags.push("ETC");
  }

  const handleClick = (hashtag) => {
    dispatch(toggleHashtag(hashtag));
  };

  return (
    <TagList tags={sortedTags} selected={selected} onClick={handleClick} />
  );
}
