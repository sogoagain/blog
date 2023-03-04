import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import Lightning from "../components/support/Lightning";

import {
  createInvoice,
  pauseInvoiceLookup,
  resumeInvoiceLookup,
} from "../features/lightningSlice";

export default function LightningContainer() {
  const dispatch = useDispatch();
  const lightning = useSelector((state) => state.lightning);

  const handleCreateInvoice = () => {
    dispatch(createInvoice());
  };

  useEffect(() => {
    if (lightning.invoice.payment_request) {
      dispatch(resumeInvoiceLookup());
    }
  }, [lightning.invoice.payment_request]);

  useEffect(() => {
    if (!lightning.invoice.payment_request) {
      dispatch(createInvoice());
    }
    return () => {
      dispatch(pauseInvoiceLookup());
    };
  }, []);

  return (
    <Lightning lightning={lightning} onCreateInvoice={handleCreateInvoice} />
  );
}
