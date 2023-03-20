import React from "react";

import Anchor from "../Anchor";

export default function ReadingList({ books }) {
  return (
    <ul>
      {books.map((book) => (
        <li key={book.id}>
          <img src={book.image} alt={book.title} />
          <div>
            <p>{book.title}</p>
            <div>
              {book.review.href ? (
                <Anchor href={book.review.href}>{book.review.text}</Anchor>
              ) : (
                <p>{book.review.text}</p>
              )}
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
