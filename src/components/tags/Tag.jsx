import React from "react";

import styled from "@emotion/styled";

const CheckboxWrapper = styled.label`
  display: inline-block;
  margin: 0 0.5rem 0.5rem 0;
  cursor: pointer;
`;

const CheckboxInput = styled.input`
  display: none;
`;

const CheckboxLabel = styled.span`
  padding: 0.1rem 0.3rem;
  border: 1px solid;
  border-color: ${(props) => (props.selected ? "black" : "inherit")};
  color: ${(props) => (props.selected ? "white" : "inherit")};
  background-color: ${(props) => (props.selected ? "black" : "inherit")};

  @media screen and (prefers-color-scheme: dark) {
    background-color: ${(props) => (props.selected ? "white" : "inherit")};
    color: ${(props) => (props.selected ? "black" : "inherit")};
    border-color: ${(props) => (props.selected ? "white" : "inherit")};
  }
`;

export default function Tag({ text, selected, handleClick }) {
  return (
    <CheckboxWrapper>
      <CheckboxInput
        type="checkbox"
        checked={selected}
        onChange={handleClick}
      />
      <CheckboxLabel selected={selected}>{text}</CheckboxLabel>
    </CheckboxWrapper>
  );
}
