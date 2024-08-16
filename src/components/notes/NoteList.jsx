import React from "react";

import Note from "./Note";

import UnstyledOrderedList from "../UnstyledOrderedList";

export default function NoteList({ notes, events, onHashtag }) {
  return (
    <UnstyledOrderedList>
      {notes.map((note) => (
        <Note key={note.id} note={note} events={events} onHashtag={onHashtag} />
      ))}
    </UnstyledOrderedList>
  );
}
