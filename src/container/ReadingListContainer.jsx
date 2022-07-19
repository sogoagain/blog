import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import styled from "@emotion/styled";

import Alert from "../components/Alert";
import Button from "../components/Button";
import Spinner from "../components/Spinner";
import ReadingList from "../components/about/ReadingList";

import { loadReadingList } from "../features/readingListSlice";

import { unit } from "../styles";

const ReadingListWrapper = styled.section({
  padding: `${unit(1)} ${unit(2)} ${unit(3)} ${unit(2)}`,
});

const LoadMoreWrapper = styled.div({
  display: "flex",
  justifyContent: "center",
});

export default function HeaderContainer() {
  const dispatch = useDispatch();
  const {
    books,
    loading,
    error,
    page: { hasMore },
  } = useSelector((state) => state.readingList);

  const handleMore = () => {
    dispatch(loadReadingList());
  };

  useEffect(() => {
    if (books.length !== 0) {
      return;
    }
    dispatch(loadReadingList());
  }, []);

  return (
    <>
      <ReadingListWrapper>
        <ReadingList books={books} />
      </ReadingListWrapper>
      <LoadMoreWrapper>
        {loading && <Spinner />}
        {!loading && hasMore && (
          <Button type="button" onClick={handleMore}>
            더 불러오기
          </Button>
        )}
      </LoadMoreWrapper>
      {error && (
        <Alert message="독서목록을 불러오는데 오류가 발생했습니다. 잠시 후 다시 확인해주세요." />
      )}
    </>
  );
}
