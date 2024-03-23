import React from "react";

import { useSelector, useDispatch } from "react-redux";

import TagList from "../components/tags/TagList";

import { toggleKeyword } from "../features/booksSlice";

export default function BooksContainer() {
  const dispatch = useDispatch();
  const {
    keyword: { keywords, selected },
  } = useSelector((state) => state.books);

  const sortedKeywords = Object.entries(keywords)
    .sort(([aKeyword, aIds], [bKeyword, bIds]) => {
      const totalCountDiff = bIds.length - aIds.length;
      return totalCountDiff === 0
        ? aKeyword.localeCompare(bKeyword, "ko")
        : totalCountDiff;
    })
    .map(([keyword]) => keyword);

  const handleClick = (hashtag) => {
    dispatch(toggleKeyword(hashtag));
  };

  return (
    <TagList tags={sortedKeywords} selected={selected} onClick={handleClick} />
  );
}
