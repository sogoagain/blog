import React from "react";

import { useSelector } from "react-redux";

import NoteList from "../components/notes/NoteList";

export default function NotesContainer() {
  const {
    events: { metadata, textNote },
    owner: { notes },
    hashtag: { tags, selected },
  } = useSelector((state) => state.nostr);

  const ownerNotes = notes
    .map((note) => textNote[note])
    .sort((a, b) => b.created_at - a.created_at);

  const filteredNotes = selected
    ? ownerNotes.filter((note) => tags[selected].includes(note.id))
    : ownerNotes;

  return <NoteList notes={filteredNotes} events={{ metadata, textNote }} />;
}
