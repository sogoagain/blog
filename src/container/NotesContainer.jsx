import React from "react";

import { useDispatch, useSelector } from "react-redux";

import NoteList from "../components/notes/NoteList";

import { appendHashtag } from "../features/nostrSlice";

export default function NotesContainer() {
  const dispatch = useDispatch();
  const {
    events: { metadata, textNote },
    owner: { notes },
    hashtag: { tags, selected },
  } = useSelector((state) => state.nostr);

  const ownerNotes = notes
    .map((note) => textNote[note])
    .sort((a, b) => a.create_at - b.create_at);

  const filteredNotes = selected
    ? ownerNotes.filter((note) => tags[selected].includes(note.id))
    : ownerNotes;

  const handleHashtag = (hashtag, id) => {
    dispatch(appendHashtag({ hashtag, id }));
  };

  return (
    <NoteList
      notes={filteredNotes}
      events={{ metadata, textNote }}
      onHashtag={handleHashtag}
    />
  );
}
