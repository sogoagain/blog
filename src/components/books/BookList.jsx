import React from "react";

import styled from "@emotion/styled";

import Anchor from "../Anchor";

const List = styled.ul`
  list-style: none;
  padding-left: 0;
`;

const Item = styled.li`
  display: flex;
  align-items: center;
  margin: 0 0 3rem;
`;

const Image = styled.img`
  width: 100px;
  height: auto;
  margin-right: 1rem;
`;

const Content = styled.div`
  max-width: calc(100% - 100px - 1rem);
  word-wrap: break-word;
`;

const TitleAndAuthor = styled.div`
  margin-bottom: 1rem;
`;

export default function BookList({ books }) {
  return (
    <List>
      {books.map(({ id, image, title, author, review }) => (
        <Item key={id}>
          <Image src={image} alt={`${title}(저자: ${author}) 책 표지`} />
          <Content>
            <TitleAndAuthor>
              <strong>{title}</strong>
              <div>
                <small>{author}</small>
              </div>
            </TitleAndAuthor>
            <div>
              {review.href ? (
                <Anchor href={review.href}>{review.text}</Anchor>
              ) : (
                review.text
              )}
            </div>
          </Content>
        </Item>
      ))}
    </List>
  );
}
