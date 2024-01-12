import React from "react";

import styled from "@emotion/styled";

import Note from "./Note";

const List = styled.ol`
  list-style: none;
  padding-left: 0;
`;

export default function NoteList({ notes }) {
  return (
    <List>
      {notes.map((note) => (
        <Note key={note.id} note={note} />
      ))}
    </List>
  );
}