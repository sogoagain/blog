import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import Alert from "../components/Alert";
import Spinner from "../components/Spinner";
import ReadingList from "../components/about/ReadingList";

import { loadReadingList } from "../features/readingListSlice";

export default function ReadingListContainer() {
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
      <ReadingList books={books} />
      {loading && <Spinner />}
      {!loading && hasMore && (
        <button type="button" onClick={handleMore}>
          더 불러오기
        </button>
      )}
      {error && (
        <Alert message="독서목록을 불러오는데 오류가 발생했습니다. 잠시 후 다시 확인해주세요." />
      )}
    </>
  );
}
