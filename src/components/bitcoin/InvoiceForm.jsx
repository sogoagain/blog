import React from "react";

import styled from "@emotion/styled";

const InputWrapper = styled.div`
  margin: 0 0 1rem;
`;

const Input = styled.input`
  width: 140px;
`;

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
    <form onSubmit={handleSubmit}>
      <InputWrapper>
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
        <span> sats</span>
        <span> for </span>
        <Input
          name="memo"
          type="text"
          placeholder="PIZZA 🍕"
          maxLength="20"
          value={memo}
          onChange={(e) => handleChange("memo", e.target.value)}
          required
        />
      </InputWrapper>
      <button type="submit">인보이스 발급하기</button>
    </form>
  );
}
