import React from "react";

import styled from "@emotion/styled";

const CheckboxWrapper = styled.label`
  display: inline-block;
  margin: 0 0.5rem 0.5rem 0;
  cursor: pointer;
`;

const CheckboxInput = styled.input`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;

  &:focus-visible + span {
    outline: 2px solid;
    outline-offset: 2px;
  }
`;

const CheckboxLabel = styled.span`
  padding: 0.125rem 0.5rem;
  border: 1px solid;
  border-color: ${(props) =>
    props.selected ? "var(--color-accent)" : "inherit"};
  color: ${(props) =>
    props.selected ? "var(--color-accent-text)" : "inherit"};
  background-color: ${(props) =>
    props.selected ? "var(--color-accent)" : "inherit"};
`;

export default function Tag({ text, selected, onClick }) {
  return (
    <CheckboxWrapper>
      <CheckboxInput
        type="checkbox"
        checked={selected}
        onChange={onClick}
        aria-label={`${text} 태그 ${selected ? "선택됨" : "선택 안됨"}`}
      />
      <CheckboxLabel selected={selected}>{text}</CheckboxLabel>
    </CheckboxWrapper>
  );
}
