import React from "react";

import styled from "@emotion/styled";

import Anchor from "../Anchor";
import DateTime from "../DateTime";
import UnstyledOrderedList from "../UnstyledOrderedList";

const ListItem = styled.li`
  margin: 0 0 1rem;
`;

export default function TranslationList({ translations }) {
  return (
    <UnstyledOrderedList>
      {translations.map(({ date, title, author, source, link }) => (
        <ListItem key={link}>
          <DateTime dateTime={date} />
          <br />
          <small>{source}</small>
          <br />
          <Anchor href={link}>{title}</Anchor>
          {" - "}
          {author}
          <br />
        </ListItem>
      ))}
    </UnstyledOrderedList>
  );
}
