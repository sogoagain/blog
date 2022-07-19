import React from "react";

import styled from "@emotion/styled";

import { unit } from "../styles";

const AlertWrapper = styled.div({
  backgroundColor: "rgba(255, 242, 240, 0.85)",
  borderRadius: unit(1),
  padding: `${unit(2)}`,
  margin: `${unit(2)}`,
});

export default function Alert({ message }) {
  return <AlertWrapper>{message}</AlertWrapper>;
}
