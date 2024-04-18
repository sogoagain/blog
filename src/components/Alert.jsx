import React from "react";

import styled from "@emotion/styled";

const AlertWrapper = styled.div`
  border: 1px solid;
  padding: 0.1rem 0.3rem;
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
