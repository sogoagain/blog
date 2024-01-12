import { createSlice } from "@reduxjs/toolkit";

import { SimplePool } from "nostr-tools";

import { bech32ToHexPublicKey } from "../utils";

const { actions, reducer } = createSlice({
  name: "nostr",
  initialState: {
    pubkey: null,
    notes: [],
  },
  reducers: {
    setPubkey: (state, { payload: pubkey }) => ({
      ...state,
      pubkey,
    }),
    appendNotes: (state, { payload: note }) => {
      const newNotes = [...state.notes, { ...note }];
      newNotes.sort((a, b) => b.created_at - a.created_at);
      return {
        ...state,
        notes: newNotes,
      };
    },
  },
});

export const { setPubkey, appendNotes } = actions;

const EVENT_KIND = {
  textNote: 1,
};

export function subscribe(relays, nPubKey) {
  return (dispatch) => {
    const pubkey = bech32ToHexPublicKey(nPubKey);
    dispatch(setPubkey(pubkey));
    const pool = new SimplePool();
    const handleTextNote = (event) => {
      if (!event.tags.some((tag) => tag[0] === "p")) {
        const note = {
          id: event.id,
          created_at: event.created_at,
          content: event.content,
        };
        dispatch(appendNotes(note));
      }
    };
    const sub = pool.subscribeMany(relays, [{ authors: [pubkey] }], {
      onevent(event) {
        switch (event.kind) {
          case EVENT_KIND.textNote:
            handleTextNote(event);
            break;
          default:
            break;
        }
      },
      oneose() {
        sub.close();
      },
    });
  };
}

export default reducer;
