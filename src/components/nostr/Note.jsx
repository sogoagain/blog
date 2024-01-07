import React from "react";

import styled from "@emotion/styled";

import { convertUnixTimestampToDate, toISOString } from "../../utils";

const ListItem = styled.li`
  margin: 0 0 2rem;
`;

const Content = styled.p`
  white-space: pre-wrap;
  word-wrap: break-word;
  margin: 0.5rem;
`;

export default function Note({ note }) {
  const date = convertUnixTimestampToDate(note.created_at);
  return (
    <ListItem>
      <small>
        <time dateTime={toISOString(date)}>{date}</time>
      </small>
      <Content>{note.content}</Content>
    </ListItem>
  );
}
