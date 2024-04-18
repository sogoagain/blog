import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import Alert from "../components/Alert";
import Spinner from "../components/Spinner";
import InvoiceForm from "../components/bitcoin/InvoiceForm";
import Lightning from "../components/bitcoin/Lightning";
import PaymentCompleted from "../components/bitcoin/PaymentCompleted";

import {
  setField,
  createInvoice,
  pauseInvoiceLookup,
  resumeInvoiceLookup,
} from "../features/lightningSlice";

export default function LightningContainer() {
  const dispatch = useDispatch();
  const { invoice, loading, error, settled, expired, fields } = useSelector(
    (state) => state.lightning,
  );

  const handleChange = ({ name, value }) => {
    dispatch(setField({ name, value }));
  };

  const handleSubmit = () => {
    dispatch(createInvoice());
  };

  const handleCreateInvoice = () => {
    dispatch(createInvoice());
  };

  useEffect(() => {
    if (invoice.payment_request) {
      dispatch(resumeInvoiceLookup());
    }
  }, [invoice.payment_request]);

  useEffect(
    () => () => {
      dispatch(pauseInvoiceLookup());
    },
    [],
  );

  if (loading) {
    return <Spinner loadingText="발급 중" />;
  }

  if (error) {
    return (
      <Alert message="인보이스 발행에 실패했습니다. 조금 후에 다시 시도해주세요." />
    );
  }

  if (!invoice.payment_request) {
    return (
      <InvoiceForm
        fields={fields}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    );
  }

  if (settled) {
    return <PaymentCompleted />;
  }

  return (
    <Lightning
      invoice={invoice}
      settled={settled}
      expired={expired}
      onCreateInvoice={handleCreateInvoice}
    />
  );
}
