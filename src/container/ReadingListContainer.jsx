import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import Spinner from "../components/Spinner";
import ReadingList from "../components/about/ReadingList";

import { loadReadingList } from "../features/readingListSlice";

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
    dispatch(loadReadingList());
  }, []);

  return (
    <>
      <ReadingList books={books} />
      {loading && <Spinner />}
      {error && <p>잠시 후 다시 시도해주세요.</p>}
      {!loading && hasMore && (
        <button type="button" onClick={handleMore}>
          더 불러오기
        </button>
      )}
    </>
  );
}
