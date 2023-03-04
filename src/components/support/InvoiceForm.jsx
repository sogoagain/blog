import React from "react";

import styled from "@emotion/styled";

import Input from "../Input";
import Button from "../Button";

import { unit } from "../../styles";

const FormWrapper = styled.form({
  minHeight: unit(40),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
});

const FormElementWrapper = styled.div({
  marginBottom: unit(4),
});

export default function InvoiceForm({
  fields: { amount, memo },
  onChange,
  onSubmit,
}) {
  const handleChange = (name, value) => {
    onChange({ name, value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <FormWrapper onSubmit={handleSubmit}>
      <FormElementWrapper>
        <Input
          name="amount"
          type="number"
          placeholder="1000"
          max={100000000}
          value={amount}
          onChange={(e) => {
            const value = e.target.value.replace(/[^0-9]/g, "");
            handleChange("amount", value);
          }}
          required
        />
        <span>sats</span>
      </FormElementWrapper>
      <FormElementWrapper>
        <span>for</span>
        <Input
          name="memo"
          type="text"
          placeholder="PIZZA 🍕"
          maxLength="20"
          value={memo}
          onChange={(e) => handleChange("memo", e.target.value)}
          required
        />
      </FormElementWrapper>
      <Button type="submit">인보이스 발급하기</Button>
    </FormWrapper>
  );
}
