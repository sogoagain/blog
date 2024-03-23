import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { graphql, useStaticQuery } from "gatsby";

import Alert from "../components/Alert";
import BookList from "../components/books/BookList";

import { loadBooks } from "../features/booksSlice";

const query = graphql`
  query {
    site {
      siteMetadata {
        siteUrl
      }
    }
  }
`;

export default function BooksContainer() {
  const {
    site: {
      siteMetadata: { siteUrl },
    },
  } = useStaticQuery(query);

  const dispatch = useDispatch();
  const {
    books,
    keyword: { keywords, selected },
    loading,
    error,
  } = useSelector((state) => state.books);

  const filteredBooks = selected
    ? books.filter((book) => keywords[selected].includes(book.id))
    : books;

  useEffect(() => {
    if (books.length !== 0 || loading) {
      return;
    }
    dispatch(loadBooks());
  }, []);

  return (
    <>
      <BookList books={filteredBooks} siteUrl={siteUrl} />
      {error && (
        <Alert message="오류가 발생했습니다. 잠시 후 다시 확인해주세요." />
      )}
    </>
  );
}
