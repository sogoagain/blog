import React from "react";

import styled from "@emotion/styled";

const AlertWrapper = styled.div`
  word-break: keep-all;
  overflow-wrap: break-word;
  border: 1px solid;
  padding: 0.25rem 0.5rem;
  text-align: center;
  margin: 1rem 0;
`;

export default function Alert({ message }) {
  return (
    <AlertWrapper role="alert" aria-live="assertive">
      {message}
    </AlertWrapper>
  );
}
