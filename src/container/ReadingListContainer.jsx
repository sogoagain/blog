import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import Anchor from "../components/Anchor";

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
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            <img src={book.image} alt={book.title} />
            <p>{book.title}</p>
            {book.review.href ? (
              <Anchor href={book.review.href}>{book.review.text}</Anchor>
            ) : (
              <p>{book.review.text}</p>
            )}
          </li>
        ))}
      </ul>
      {loading && <p>로딩...</p>}
      {error && <p>잠시 후 다시 시도해주세요.</p>}
      {!loading && hasMore && (
        <button type="button" onClick={handleMore}>
          더 불러오기
        </button>
      )}
    </>
  );
}
