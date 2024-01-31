import { createSlice } from "@reduxjs/toolkit";

import { SimplePool } from "nostr-tools";

import { bech32ToHexPublicKey } from "../utils";

const { actions, reducer } = createSlice({
  name: "nostr",
  initialState: {
    pubkey: null,
    status: {
      id: "",
      content: "",
    },
    notes: [],
    hashtags: {
      ETC: [],
    },
    selected: {
      hashtag: null,
      ids: [],
    },
  },
  reducers: {
    setPubkey: (state, { payload: pubkey }) => ({
      ...state,
      pubkey,
    }),
    setStatus: (state, { payload: status }) => ({
      ...state,
      status: { ...status },
    }),
    appendNotes: (state, { payload: note }) => {
      const newNotes = [...state.notes, { ...note }];
      newNotes.sort((a, b) => b.created_at - a.created_at);
      return {
        ...state,
        notes: newNotes,
        hashtags: {
          ...state.hashtags,
          ETC: [...state.hashtags.ETC, note.id],
        },
      };
    },
    appendHashtag: (state, { payload: { hashtag, id } }) => {
      const key = hashtag.replace("#", "").toUpperCase();
      const originIds = state.hashtags[key] ? state.hashtags[key] : [id];
      const newIds = originIds.includes(id) ? originIds : [...originIds, id];
      return {
        ...state,
        hashtags: {
          ...state.hashtags,
          [key]: newIds,
          ETC: state.hashtags.ETC.filter((etcId) => id !== etcId),
        },
      };
    },
    toggleHashtag: (state, { payload: hashtag }) => ({
      ...state,
      selected:
        state.selected.hashtag === hashtag
          ? {
              hashtag: null,
              ids: [],
            }
          : {
              hashtag,
              ids: state.hashtags[hashtag],
            },
    }),
  },
});

export const {
  setPubkey,
  setStatus,
  appendNotes,
  appendHashtag,
  toggleHashtag,
} = actions;

const EVENT_KIND = {
  textNote: 1,
  userStatus: 30315,
};

export function subscribe(relays, nPubKey) {
  return (dispatch) => {
    const pubkey = bech32ToHexPublicKey(nPubKey);
    dispatch(setPubkey(pubkey));
    const pool = new SimplePool();
    const handleTextNote = (event) => {
      if (!event.tags.some((tag) => tag[0] === "e")) {
        const note = {
          id: event.id,
          created_at: event.created_at,
          content: event.content,
        };
        dispatch(appendNotes(note));
      }
    };
    const handleUserStatus = (event) => {
      if (event.tags.some((tag) => tag[0] === "d" && tag[1] === "general")) {
        const status = {
          id: event.id,
          content: event.content,
        };
        dispatch(setStatus(status));
      }
    };
    const sub = pool.subscribeMany(relays, [{ authors: [pubkey] }], {
      onevent(event) {
        switch (event.kind) {
          case EVENT_KIND.textNote:
            handleTextNote(event);
            break;
          case EVENT_KIND.userStatus:
            handleUserStatus(event);
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
