import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import Alert from "../components/Alert";
import Spinner from "../components/Spinner";
import BookList from "../components/books/BookList";

import { loadBooks } from "../features/booksSlice";

export default function BooksContainer() {
  const dispatch = useDispatch();
  const { books, loading, error } = useSelector((state) => state.books);

  useEffect(() => {
    if (books.length !== 0) {
      return;
    }
    dispatch(loadBooks());
  }, []);

  return (
    <>
      <BookList books={books} />
      {loading && <Spinner />}
      {error && (
        <Alert message="오류가 발생했습니다. 잠시 후 다시 확인해주세요." />
      )}
    </>
  );
}
