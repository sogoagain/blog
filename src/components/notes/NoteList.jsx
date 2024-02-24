import React from "react";

import styled from "@emotion/styled";

import Note from "./Note";

const List = styled.ol`
  list-style: none;
  padding-left: 0;
`;

export default function NoteList({ notes, profiles, onHashtag }) {
  return (
    <List>
      {notes.map((note) => (
        <Note
          key={note.id}
          note={note}
          profiles={profiles}
          onHashtag={onHashtag}
        />
      ))}
    </List>
  );
}
