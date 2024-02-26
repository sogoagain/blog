import React from "react";

import styled from "@emotion/styled";

import Anchor from "../Anchor";

import { toISOString } from "../../utils";

const List = styled.ol`
  list-style: none;
  padding-left: 0;
`;

const ListItem = styled.li`
  margin: 0 0 1rem;
`;

export default function TranslationList({ translations }) {
  return (
    <List>
      {translations.map(({ date, title, author, source, link }) => (
        <ListItem key={link}>
          <small>
            <time dateTime={toISOString(date)}>{date}</time>
            <br />
            {source}
          </small>
          <br />
          <Anchor href={link}>{title}</Anchor>
          {" - "}
          {author}
          <br />
        </ListItem>
      ))}
    </List>
  );
}
