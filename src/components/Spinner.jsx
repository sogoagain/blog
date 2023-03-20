import styled from "@emotion/styled";

import { keyframes } from "@emotion/react";

import { unit, color } from "../styles";

const spin = keyframes`
    to { -webkit-transform: rotate(360deg); }
`;

const Spinner = styled.div({
  width: unit(2),
  height: unit(2),
  border: `${unit(0.2)} solid rgb(15 15 15 / 10%)`,
  borderRadius: "50%",
  borderTopColor: color.primary,
  animation: `${spin} 1s ease-in-out infinite`,
});

export default Spinner;
