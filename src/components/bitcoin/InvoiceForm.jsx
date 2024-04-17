import React from "react";

import styled from "@emotion/styled";

const InputWrapper = styled.div`
  margin: 0 0 1rem;
`;

const InputGroup = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

const Input = styled.input`
  width: 140px;
  margin-right: 0.5rem;
`;

const Label = styled.span`
  margin-right: 0.5rem;
`;

export default function InvoiceForm({
  fields: { amount, memo },
  onChange,
  onSubmit,
}) {
  const handleChange = (e, name) => {
    let { value } = e.target;
    if (name === "amount") {
      let number = value.replace(/[^0-9]/g, "");
      if (number === "") {
        number = "0";
      }
      value = parseInt(number, 10);
    }
    onChange({ name, value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit}>
      <InputWrapper>
        <InputGroup>
          <Input
            name="amount"
            type="text"
            inputmode="numeric"
            pattern="\d*"
            placeholder="2100"
            max={100000000}
            value={amount}
            onChange={(e) => handleChange(e, "amount")}
            required
          />
          <Label>sats</Label>
        </InputGroup>
        <InputGroup>
          <Label>for</Label>
          <Input
            name="memo"
            type="text"
            placeholder="PIZZA 🍕"
            maxLength="20"
            value={memo}
            onChange={(e) => handleChange(e, "memo")}
            required
          />
        </InputGroup>
      </InputWrapper>
      <button type="submit">인보이스 발급하기</button>
    </form>
  );
}
