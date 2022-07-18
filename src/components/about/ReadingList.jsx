import React from "react";

import styled from "@emotion/styled";

import Anchor from "../Anchor";

import { unit, color } from "../../styles";

const ReadingListWrapper = styled.ul({
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "space-evenly",
  listStyleType: "none",
  wordWrap: "break-word",
});

const BookItem = styled.li({
  width: unit(40),
  borderRadius: unit(1),
  boxShadow: `rgb(15 15 15 / 10%) 0px 0px 0px 1px, rgb(15 15 15 / 10%) 0px 2px 4px`,
  marginBottom: unit(4),
});

const BookCover = styled.img({
  display: "block",
  margin: "0 auto",
  height: unit(30),
});

const BookDetail = styled.div({
  borderTop: `${unit(0.2)} solid rgb(15 15 15 / 10%)`,
});

const BookTitle = styled.p({
  padding: `${unit(1)} ${unit(2)}`,
  fontWeight: 700,
});

const BookReview = styled("div")`
  padding: 0 ${unit(2)} ${unit(1)} ${unit(2)};
  color: ${color.secondary};
  & a {
    color: ${color.secondary};
    &:hover {
      color: ${color.brand};
    }
  }
`;

export default function ReadingList({ books }) {
  return (
    <ReadingListWrapper>
      {books.map((book) => (
        <BookItem key={book.id}>
          <BookCover src={book.image} alt={book.title} />
          <BookDetail>
            <BookTitle>{book.title}</BookTitle>
            <BookReview>
              {book.review.href ? (
                <Anchor href={book.review.href}>{book.review.text}</Anchor>
              ) : (
                <p>{book.review.text}</p>
              )}
            </BookReview>
          </BookDetail>
        </BookItem>
      ))}
    </ReadingListWrapper>
  );
}
