import { createSlice } from "@reduxjs/toolkit";
import { batch } from "react-redux";

import {
  createLightningInvoice,
  lookupLightningInvoice,
} from "../services/blog";

const { actions, reducer } = createSlice({
  name: "lightning",
  initialState: {
    invoice: {
      value: 0,
      memo: null,
      expiry: 0,
      r_hash: null,
      payment_request: null,
    },
    settled: false,
    expired: false,
    loading: false,
    error: false,
    intervalId: null,
  },
  reducers: {
    setInvoice: (state, { payload: invoice }) => ({
      ...state,
      invoice: {
        ...state.invoice,
        ...invoice,
      },
    }),
    setSettled: (state, { payload: settled }) => ({
      ...state,
      settled,
    }),
    setExpired: (state, { payload: expired }) => ({
      ...state,
      expired,
    }),
    setLoading: (state, { payload: loading }) => ({
      ...state,
      loading,
    }),
    setError: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    setIntervalId: (state, { payload: intervalId }) => ({
      ...state,
      intervalId,
    }),
  },
});

export const {
  setInvoice,
  setSettled,
  setExpired,
  setLoading,
  setError,
  setIntervalId,
} = actions;

export function pauseInvoiceLookup() {
  return (dispatch, getState) => {
    const {
      lightning: { intervalId },
    } = getState();
    if (intervalId) {
      clearInterval(intervalId);
      dispatch(setIntervalId(null));
    }
  };
}

function lookupInvoice() {
  return async (dispatch, getState) => {
    const {
      lightning: {
        expired,
        invoice: { r_hash },
      },
    } = getState();

    if (expired) {
      dispatch(pauseInvoiceLookup());
      return;
    }

    try {
      const { settled } = await lookupLightningInvoice({ r_hash });
      if (settled) {
        dispatch(setSettled(settled));
        dispatch(pauseInvoiceLookup());
      }
    } catch (err) {
      dispatch(setSettled(false));
    }
  };
}

export function resumeInvoiceLookup() {
  return (dispatch, getState) => {
    const {
      lightning: { settled, expired },
    } = getState();

    if (settled || expired) {
      return;
    }

    const intervalId = setInterval(() => {
      dispatch(setIntervalId(intervalId));
      dispatch(lookupInvoice());
    }, 2000);
  };
}

export function createInvoice() {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const invoice = await createLightningInvoice();
      batch(() => {
        dispatch(setInvoice(invoice));
        dispatch(setSettled(false));
        dispatch(setExpired(false));
      });

      setTimeout(() => {
        dispatch(setExpired(true));
      }, (invoice.expiry - 1) * 1000);
    } catch (err) {
      dispatch(setError(true));
    }
    dispatch(setLoading(false));
  };
}

export default reducer;
