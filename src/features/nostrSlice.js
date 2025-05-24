import { createSlice } from "@reduxjs/toolkit";

import { SimplePool, nip19 } from "nostr-tools";

import { refineContentWithReferences } from "../utils/nostr";

const { actions, reducer } = createSlice({
  name: "nostr",
  initialState: {
    pending: [],
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
    appendPendingRequest: (state, { payload: filter }) => ({
      ...state,
      pending: [...state.pending, filter],
    }),
    setPendingRequests: (state, { payload: filters }) => ({
      ...state,
      pending: [...filters],
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
          : (state.hashtag.tags.ETC || []).filter((etcId) => etcId !== id);
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
  appendPendingRequest,
  setPendingRequests,
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

const handleEvent = (event) =>
  ({
    [EVENT_KIND.metadata]: (dispatch) => {
      const content = JSON.parse(event.content);
      dispatch(appendMetadataEvent({ ...event, content }));
    },
    [EVENT_KIND.textNote]: (dispatch, getState) => {
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
      if (pubkeysToLoadProfile.length > 0) {
        dispatch(
          appendPendingRequest({
            authors: [...pubkeysToLoadProfile],
            kinds: [EVENT_KIND.metadata],
          }),
        );
      }
      const idsToLoadTextNote = idsQuoted.filter((id) => !textNote[id]);
      if (idsToLoadTextNote.length > 0) {
        dispatch(
          appendPendingRequest({
            ids: [...idsToLoadTextNote],
            kinds: [EVENT_KIND.textNote],
          }),
        );
      }
      const author = metadata[event.pubkey];
      if (!author) {
        dispatch(
          appendPendingRequest({
            authors: [event.pubkey],
            kinds: [EVENT_KIND.metadata],
          }),
        );
      }
      dispatch(appendTextNoteEvent({ ...event, content }));
    },
    [EVENT_KIND.userStatus]: (dispatch) => {
      dispatch(appendUserStatusEvent(event));
    },
  })[event.kind] || (() => {});

const handleOwnerEvent = (event) =>
  ({
    [EVENT_KIND.textNote]: (dispatch) => {
      const hasETag = event.tags.some((tag) => tag[0] === "e");
      const isMention = event.tags.some(
        (tag) => tag[0] === "e" && tag[tag.length - 1] === "mention",
      );
      const isOwnerNote = !hasETag || isMention;
      if (isOwnerNote) {
        const tTags = event.tags.filter((tag) => tag[0] === "t");
        if (tTags.length === 0) {
          dispatch(appendHashtag({ hashtag: "ETC", id: event.id }));
        } else {
          tTags.forEach((tag) => {
            dispatch(appendHashtag({ hashtag: tag[1], id: event.id }));
          });
        }
        dispatch(appendOwnerNotes(event.id));
      }
    },
    [EVENT_KIND.userStatus]: (dispatch) => {
      if (event.tags.some((tag) => tag[0] === "d" && tag[1] === "general")) {
        dispatch(setOwnerStatus(event.id));
      }
    },
  })[event.kind] || (() => {});

function subscribeEvents(relays, filters, onEvent, eoseTimeout = 10000) {
  return (dispatch, getState) => {
    const completedRelays = new Set();

    const handleCompletion = () => {
      if (completedRelays.size === relays.length) {
        const {
          nostr: { pending },
        } = getState();
        if (pending.length > 0) {
          const batch = pending.slice(0, 20);
          const remaining = pending.slice(20);
          dispatch(setPendingRequests(remaining));
          dispatch(subscribeEvents(relays, batch, handleEvent, eoseTimeout));
        }
      }
    };

    relays.forEach(async (relayUrl) => {
      try {
        const relay = await pool.ensureRelay(relayUrl, {
          connectionTimeout: eoseTimeout,
        });

        const subscription = relay.subscribe(filters, {
          eoseTimeout,
          onevent: (event) => {
            onEvent(event)(dispatch, getState);
          },
          oneose: () => {
            subscription.close();
            completedRelays.add(relayUrl);
            handleCompletion();
          },
          onclose: (reason) => {
            console.info(`Relay ${relayUrl} closed:`, reason);
            completedRelays.add(relayUrl);
            handleCompletion();
          },
          alreadyHaveEvent: (id) => {
            const {
              nostr: {
                events: { metadata, textNote, userStatus },
              },
            } = getState();
            return !!(metadata?.[id] || textNote?.[id] || userStatus?.[id]);
          },
        });
      } catch (err) {
        console.error(`Relay ${relayUrl} connection error:`, err);
        completedRelays.add(relayUrl);
        handleCompletion();
      }
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
        [
          {
            authors: [pubkey],
            kinds: [
              EVENT_KIND.metadata,
              EVENT_KIND.textNote,
              EVENT_KIND.userStatus,
            ],
          },
        ],
        (event) => (innerDispatch, getState) => {
          handleEvent(event)(innerDispatch, getState);
          if (event.pubkey === pubkey) {
            handleOwnerEvent(event)(innerDispatch, getState);
          }
        },
      ),
    );
  };
}

export default reducer;
