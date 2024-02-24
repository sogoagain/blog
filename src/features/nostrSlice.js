import { createSlice } from "@reduxjs/toolkit";

import { SimplePool, nip19 } from "nostr-tools";

import { bech32ToHexPublicKey } from "../utils";
import { refineContentWithReferences } from "../utils/nostr";

const { actions, reducer } = createSlice({
  name: "nostr",
  initialState: {
    pubkey: null,
    status: {
      id: "",
      content: "",
    },
    notes: [],
    hashtags: {},
    profiles: {},
    selectedHashtag: null,
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
      };
    },
    appendHashtag: (state, { payload: { hashtag, id } }) => {
      const key = hashtag.replace("#", "").toUpperCase();
      const newIds = state.hashtags[key]
        ? [...new Set([...state.hashtags[key], id])]
        : [id];
      const etcIds =
        key === "ETC"
          ? newIds
          : state.hashtags.ETC.filter((etcId) => etcId !== id);
      return {
        ...state,
        hashtags: {
          ...state.hashtags,
          [key]: newIds,
          ETC: etcIds,
        },
      };
    },
    appendProfiles: (state, { payload: profiles }) => {
      const newProfiles = profiles.reduce(
        (acc, profile) => ({
          ...acc,
          [profile.nPubKey]: profile,
        }),
        {},
      );
      return {
        ...state,
        profiles: {
          ...state.profiles,
          ...newProfiles,
        },
      };
    },
    toggleHashtag: (state, { payload: hashtag }) => ({
      ...state,
      selectedHashtag: state.selectedHashtag === hashtag ? null : hashtag,
    }),
  },
});

export const {
  setPubkey,
  setStatus,
  appendNotes,
  appendHashtag,
  appendProfiles,
  toggleHashtag,
} = actions;

const EVENT_KIND = {
  metadata: 0,
  textNote: 1,
  userStatus: 30315,
};

export function loadProfiles(relays, mentionedPubkeys) {
  return async (dispatch) => {
    const pool = new SimplePool();
    const events = await pool.querySync(relays, {
      authors: [...mentionedPubkeys],
      kinds: [EVENT_KIND.metadata],
    });
    const latestEvents = events.reduce((acc, event) => {
      if (
        !acc[event.pubkey] ||
        acc[event.pubkey].created_at < event.created_at
      ) {
        acc[event.pubkey] = event;
      }
      return acc;
    }, {});
    const profiles = Object.values(latestEvents).map((event) => ({
      ...event,
      nPubKey: nip19.npubEncode(event.pubkey),
    }));
    dispatch(appendProfiles(profiles));
  };
}

export function subscribe(relays, nPubKey) {
  return (dispatch) => {
    const pubkey = bech32ToHexPublicKey(nPubKey);
    dispatch(setPubkey(pubkey));
    const pool = new SimplePool();
    const handleTextNote = (event) => {
      if (!event.tags.some((tag) => tag[0] === "e")) {
        const { content, mentionedPubkeys } =
          refineContentWithReferences(event);
        if (mentionedPubkeys && mentionedPubkeys.length > 0) {
          dispatch(loadProfiles(relays, mentionedPubkeys));
        }
        const note = {
          id: event.id,
          created_at: event.created_at,
          content,
        };
        dispatch(appendHashtag({ hashtag: "ETC", id: note.id }));
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
    const sub = pool.subscribeMany(
      relays,
      [
        {
          authors: [pubkey],
          kinds: [EVENT_KIND.textNote, EVENT_KIND.userStatus],
        },
      ],
      {
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
      },
    );
  };
}

export default reducer;
