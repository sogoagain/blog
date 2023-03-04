import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import styled from "@emotion/styled";

import Lightning from "../components/support/Lightning";
import RespectSatoshi from "../components/support/RespectSatoshi";

import { createInvoice } from "../features/lightningSlice";

import { unit } from "../styles";

const LightningSection = styled.div({
  minHeight: unit(40),
  padding: `${unit(4)} ${unit(2)}`,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-between",
});

export default function LightningContainer() {
  const dispatch = useDispatch();
  const lightning = useSelector((state) => state.lightning);

  const handleCreateInvoice = () => {
    dispatch(createInvoice());
  };

  useEffect(async () => {
    if (!lightning.invoice.payment_request) {
      dispatch(createInvoice());
    }
  }, []);

  return (
    <LightningSection>
      <Lightning lightning={lightning} onCreateInvoice={handleCreateInvoice} />
      <RespectSatoshi />
    </LightningSection>
  );
}
