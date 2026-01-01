import React from "react";

import { useSelector, useDispatch } from "react-redux";

import styled from "@emotion/styled";

import TagList from "../components/tags/TagList";

import { toggleKeyword } from "../features/booksSlice";

const BooksKeywordListWrapper = styled.div`
  margin-top: 1rem;
`;

export default function BooksKeywordListContainer() {
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

  const handleClick = (keyword) => {
    dispatch(toggleKeyword(keyword));
  };

  return (
    <BooksKeywordListWrapper>
      <TagList
        tags={sortedKeywords}
        selected={selected}
        onClick={handleClick}
      />
    </BooksKeywordListWrapper>
  );
}
