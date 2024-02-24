import React from "react";

import { useDispatch, useSelector } from "react-redux";

import NoteList from "../components/notes/NoteList";

import { appendHashtag } from "../features/nostrSlice";

export default function NotesContainer() {
  const dispatch = useDispatch();
  const { notes, hashtags, selectedHashtag, profiles, quotes } = useSelector(
    (state) => state.nostr,
  );

  const filteredNotes = selectedHashtag
    ? notes.filter((note) => hashtags[selectedHashtag].includes(note.id))
    : notes;

  const handleHashtag = (hashtag, id) => {
    dispatch(appendHashtag({ hashtag, id }));
  };

  return (
    <NoteList
      notes={filteredNotes}
      profiles={profiles}
      quotes={quotes}
      onHashtag={handleHashtag}
    />
  );
}
