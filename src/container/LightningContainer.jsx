import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import Alert from "../components/Alert";
import Spinner from "../components/Spinner";
import InvoiceForm from "../components/support/InvoiceForm";
import Lightning from "../components/support/Lightning";
import PaymentCompleted from "../components/support/PaymentCompleted";

import {
  setField,
  createInvoice,
  pauseInvoiceLookup,
  resumeInvoiceLookup,
} from "../features/lightningSlice";

export default function LightningContainer() {
  const dispatch = useDispatch();
  const { invoice, loading, error, settled, expired, fields } = useSelector(
    (state) => state.lightning
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
    []
  );

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return (
      <Alert message="라이트닝 인보이스를 발행하지 못했습니다. 잠시 후 다시 확인해주세요." />
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
    return <PaymentCompleted amount={invoice.value} />;
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
