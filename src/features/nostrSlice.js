import { createSlice } from "@reduxjs/toolkit";

import { SimplePool, nip19 } from "nostr-tools";

import { refineContentWithReferences } from "../utils/nostr";

const { actions, reducer } = createSlice({
  name: "nostr",
  initialState: {
    relays: [],
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
    appendPendingRequest: (state, { payload: filter }) => {
      state.pending.push(filter);
    },
    setPendingRequests: (state, { payload: filters }) => {
      state.pending = filters;
    },
    appendMetadataEvent: (state, { payload: event }) => {
      const existingEvent = state.events.metadata[event.pubkey];
      const shouldUpdate = existingEvent
        ? event.created_at > existingEvent.created_at
        : true;
      if (shouldUpdate) {
        state.events.metadata[event.pubkey] = event;
      }
    },
    appendTextNoteEvent: (state, { payload: event }) => {
      state.events.textNote[event.id] = event;
    },
    appendUserStatusEvent: (state, { payload: event }) => {
      state.events.userStatus[event.id] = event;
    },
    setOwnerPubkey: (state, { payload: pubkey }) => {
      state.owner.pubkey = pubkey;
    },
    appendOwnerNotes: (state, { payload: id }) => {
      state.owner.notes.push(id);
    },
    setOwnerStatus: (state, { payload: id }) => {
      state.owner.status = id;
    },
    appendHashtag: (state, { payload: { hashtag, id } }) => {
      const key = hashtag.replace("#", "").toUpperCase();
      const existing = state.hashtag.tags[key] || [];
      state.hashtag.tags[key] = [...new Set([...existing, id])];
      if (key !== "ETC") {
        state.hashtag.tags.ETC = (state.hashtag.tags.ETC || []).filter(
          (etcId) => etcId !== id,
        );
      }
    },
    toggleHashtag: (state, { payload: hashtag }) => {
      state.hashtag.selected =
        state.hashtag.selected === hashtag ? null : hashtag;
    },
    setRelays: (state, { payload: relays }) => {
      state.relays = relays;
    },
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
  setRelays,
} = actions;

const EVENT_KIND = {
  metadata: 0,
  textNote: 1,
  relayList: 10002,
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

function loadOwnerEvents(relays, pubkey) {
  return (dispatch) => {
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
        (event) => (innerDispatch, innerGetState) => {
          handleEvent(event)(innerDispatch, innerGetState);
          if (event.pubkey === pubkey) {
            handleOwnerEvent(event)(innerDispatch, innerGetState);
          }
        },
      ),
    );
  };
}

function parseRelayListEvent(event) {
  return event.tags
    .filter((tag) => tag[0] === "r")
    .map((tag) => tag[1])
    .filter((url) => url.startsWith("wss://"));
}

export function loadOwners(bootstrapRelays, npub) {
  return async (dispatch) => {
    const { data: pubkey } = nip19.decode(npub);
    dispatch(setOwnerPubkey(pubkey));

    let dynamicRelays = [];

    try {
      const relayListEvents = await pool.querySync(bootstrapRelays, {
        authors: [pubkey],
        kinds: [EVENT_KIND.relayList],
      });

      if (relayListEvents.length > 0) {
        const latestEvent = relayListEvents.reduce((latest, event) =>
          event.created_at > latest.created_at ? event : latest,
        );
        dynamicRelays = parseRelayListEvent(latestEvent);
      }
    } catch (err) {
      console.error("Failed to fetch relay list:", err);
    }

    const allRelays = [...new Set([...bootstrapRelays, ...dynamicRelays])];
    dispatch(setRelays(allRelays));
    dispatch(loadOwnerEvents(allRelays, pubkey));
  };
}

export default reducer;
