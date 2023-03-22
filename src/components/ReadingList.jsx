import React from "react";

import styled from "@emotion/styled";

import Anchor from "./Anchor";

const List = styled.ul`
  list-style: none;
  padding-left: 0;
`;

const Item = styled.li`
  display: flex;
  align-items: center;
  margin: 0 0 1rem;
`;

const Image = styled.img`
  width: 100px;
  height: auto;
  margin-right: 1rem;
`;

const Detail = styled.div`
  display: flex;
  flex-direction: column;
`;

export default function ReadingList({ books }) {
  return (
    <List>
      {books.map((book) => (
        <Item key={book.id}>
          <Image src={book.image} alt={book.title} />
          <Detail>
            <p>
              <strong>{book.title}</strong>
            </p>
            <p>
              {book.review.href ? (
                <Anchor href={book.review.href}>{book.review.text}</Anchor>
              ) : (
                book.review.text
              )}
            </p>
          </Detail>
        </Item>
      ))}
    </List>
  );
}
