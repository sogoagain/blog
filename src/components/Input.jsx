import styled from "@emotion/styled";

import { unit } from "../styles";

const Input = styled("input")`
  border: none;
  outline: none;
  background-color: transparent;
  border-bottom: 1px solid black;
  text-align: center;
  padding: ${unit(1)};
  font-size: ${unit(3)};
  -webkit-text-size-adjust: none;
`;

export default Input;
