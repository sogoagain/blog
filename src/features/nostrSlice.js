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

export function subscribe(nPubKey) {
  return (dispatch) => {
    const pubkey = bech32ToHexPublicKey(nPubKey);
    dispatch(setPubkey(pubkey));
    const pool = new SimplePool();
    const sub = pool.subscribeMany(
      [
        "wss://relay.snort.social",
        "wss://relay.damus.io",
        "wss://nostr.bitcoiner.social",
        "wss://relay.nostr.band",
      ],
      [
        {
          authors: [pubkey],
        },
      ],
      {
        onevent(event) {
          const TEXT_NOTE = 1;
          if (event.kind === TEXT_NOTE) {
            if (!event.tags.some((tag) => tag[0] === "p")) {
              const note = {
                id: event.id,
                created_at: event.created_at,
                content: event.content,
              };
              dispatch(appendNotes(note));
            }
          }
        },
        oneose() {
          sub.close();
        },
      }
    );
  };
}

export default reducer;
