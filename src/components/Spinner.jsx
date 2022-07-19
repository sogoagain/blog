import styled from "@emotion/styled";

import { keyframes } from "@emotion/react";

import { unit, color } from "../styles";

const spin = keyframes`
    to { -webkit-transform: rotate(360deg); }
`;

const Spinner = styled.div({
  display: "inline-block",
  width: unit(5),
  height: unit(5),
  border: `${unit(0.4)} solid rgb(15 15 15 / 10%)`,
  borderRadius: "50%",
  borderTopColor: color.brand,
  animation: `${spin} 1s ease-in-out infinite`,
});

export default Spinner;
