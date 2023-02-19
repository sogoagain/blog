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
  },
});

export const { setInvoice, setSettled, setExpired, setLoading, setError } =
  actions;

function lookupInvoice(intervalId) {
  return async (dispatch, getState) => {
    const {
      lightning: {
        expired,
        invoice: { r_hash },
      },
    } = getState();

    if (expired) {
      clearInterval(intervalId);
      return;
    }

    try {
      const { settled } = await lookupLightningInvoice({ r_hash });
      if (settled) {
        dispatch(setSettled(settled));
        clearInterval(intervalId);
      }
    } catch (err) {
      dispatch(setSettled(false));
    }
  };
}

export function createInvoice() {
  return async (dispatch, getState) => {
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
      }, invoice.expiry * 1000);

      const intervalId = setInterval(
        () => lookupInvoice(intervalId)(dispatch, getState),
        2000
      );
    } catch (err) {
      dispatch(setError(true));
    }
    dispatch(setLoading(false));
  };
}

export default reducer;
