import { createSlice } from "@reduxjs/toolkit";

import { SimplePool, nip19 } from "nostr-tools";

import { refineContentWithReferences } from "../utils/nostr";

const { actions, reducer } = createSlice({
  name: "nostr",
  initialState: {
    queue: [],
    events: {
      metadata: {},
      textNote: {},
      userStatus: {},
    },
    owner: {
      pubkey: null,
      notes: [],
      status: null,
    },
    hashtag: {
      tags: {},
      selected: null,
    },
  },
  reducers: {
    enqueueRequest: (state, { payload: filter }) => ({
      ...state,
      queue: [...state.queue, filter],
    }),
    dequeueRequest: (state) => ({
      ...state,
      queue: [...state.queue.slice(1)],
    }),
    appendMetadataEvent: (state, { payload: event }) => {
      const existingEvent = state.events.metadata[event.pubkey];
      const shouldUpdate = existingEvent
        ? event.created_at > existingEvent.created_at
        : true;
      return {
        ...state,
        events: {
          ...state.events,
          metadata: {
            ...state.events.metadata,
            [event.pubkey]: shouldUpdate ? event : existingEvent,
          },
        },
      };
    },
    appendTextNoteEvent: (state, { payload: event }) => ({
      ...state,
      events: {
        ...state.events,
        textNote: {
          ...state.events.textNote,
          [event.id]: event,
        },
      },
    }),
    appendUserStatusEvent: (state, { payload: event }) => ({
      ...state,
      events: {
        ...state.events,
        userStatus: {
          ...state.events.userStatus,
          [event.id]: event,
        },
      },
    }),
    setOwnerPubkey: (state, { payload: pubkey }) => ({
      ...state,
      owner: {
        ...state.owner,
        pubkey,
      },
    }),
    appendOwnerNotes: (state, { payload: id }) => ({
      ...state,
      owner: {
        ...state.owner,
        notes: [...state.owner.notes, id],
      },
    }),
    setOwnerStatus: (state, { payload: id }) => ({
      ...state,
      owner: {
        ...state.owner,
        status: id,
      },
    }),
    appendHashtag: (state, { payload: { hashtag, id } }) => {
      const key = hashtag.replace("#", "").toUpperCase();
      const newIds = state.hashtag.tags[key]
        ? [...new Set([...state.hashtag.tags[key], id])]
        : [id];
      const etcIds =
        key === "ETC"
          ? newIds
          : state.hashtag.tags.ETC.filter((etcId) => etcId !== id);
      return {
        ...state,
        hashtag: {
          ...state.hashtag,
          tags: {
            ...state.hashtag.tags,
            [key]: newIds,
            ETC: etcIds,
          },
        },
      };
    },
    toggleHashtag: (state, { payload: hashtag }) => ({
      ...state,
      hashtag: {
        ...state.hashtag,
        selected: state.hashtag.selected === hashtag ? null : hashtag,
      },
    }),
  },
});

export const {
  enqueueRequest,
  dequeueRequest,
  appendMetadataEvent,
  appendTextNoteEvent,
  appendUserStatusEvent,
  setOwnerPubkey,
  appendOwnerNotes,
  setOwnerStatus,
  appendHashtag,
  toggleHashtag,
} = actions;

const EVENT_KIND = {
  metadata: 0,
  textNote: 1,
  userStatus: 30315,
};

const pool = new SimplePool();

function subscribeEvents(relays, filter, onEvent) {
  return (dispatch, getState) => {
    const sub = pool.subscribeMany([...relays], [{ ...filter }], {
      onevent(event) {
        if (onEvent) {
          onEvent(event);
        }
        if (event.kind === EVENT_KIND.metadata) {
          const content = JSON.parse(event.content);
          dispatch(appendMetadataEvent({ ...event, content }));
        }
        if (event.kind === EVENT_KIND.textNote) {
          const { content, pubkeysMentioned, idsQuoted } =
            refineContentWithReferences(event);
          const {
            nostr: {
              events: { metadata, textNote },
            },
          } = getState();
          const pubkeysToLoadProfile = pubkeysMentioned.filter(
            (pubkey) => !metadata[pubkey],
          );
          if (pubkeysToLoadProfile && pubkeysToLoadProfile.length > 0) {
            dispatch(
              enqueueRequest({
                authors: [...pubkeysToLoadProfile],
                kinds: [EVENT_KIND.metadata],
              }),
            );
          }
          const idsToLoadTextNote = idsQuoted.filter((id) => !textNote[id]);
          if (idsToLoadTextNote && idsToLoadTextNote.length > 0) {
            dispatch(
              enqueueRequest({
                ids: [...idsToLoadTextNote],
                kinds: [EVENT_KIND.textNote],
              }),
            );
          }
          const author = metadata[event.pubkey];
          if (!author) {
            dispatch(
              enqueueRequest({
                authors: [event.pubkey],
                kinds: [EVENT_KIND.metadata],
              }),
            );
          }
          dispatch(appendTextNoteEvent({ ...event, content }));
        }
        if (event.kind === EVENT_KIND.userStatus) {
          dispatch(appendUserStatusEvent(event));
        }
      },
      oneose() {
        const {
          nostr: { queue },
        } = getState();
        if (queue.length === 0) {
          sub.close();
        } else {
          dispatch(subscribeEvents(relays, queue[0]));
          dispatch(dequeueRequest());
        }
      },
    });
  };
}

export function loadOwners(relays, npub) {
  return (dispatch) => {
    const { data: pubkey } = nip19.decode(npub);
    dispatch(setOwnerPubkey(pubkey));
    dispatch(
      subscribeEvents(
        relays,
        {
          authors: [pubkey],
          kinds: [
            EVENT_KIND.metadata,
            EVENT_KIND.textNote,
            EVENT_KIND.userStatus,
          ],
        },
        (event) => {
          if (event.pubkey !== pubkey) {
            return;
          }
          switch (event.kind) {
            case EVENT_KIND.textNote:
              if (!event.tags.some((tag) => tag[0] === "e")) {
                dispatch(appendHashtag({ hashtag: "ETC", id: event.id }));
                dispatch(appendOwnerNotes(event.id));
              }
              break;
            case EVENT_KIND.userStatus:
              if (
                event.tags.some((tag) => tag[0] === "d" && tag[1] === "general")
              ) {
                dispatch(setOwnerStatus(event.id));
              }
              break;
            default:
              break;
          }
        },
      ),
    );
  };
}

export default reducer;
