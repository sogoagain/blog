import React from "react";

import styled from "@emotion/styled";

const Wrapper = styled.div`
  margin: 1rem 0;
`;

export default function Alert({ message }) {
  return (
    <Wrapper>
      <code>{message}</code>
    </Wrapper>
  );
}
