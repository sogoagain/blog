import styled from "@emotion/styled";

import { unit, color } from "../styles";

const Button = styled("button")`
  background: ${color.background};
  color: ${color.primary};
  font-size: ${unit(2)};
  appearance: none;
  padding: ${unit(1)} ${unit(2)};
  border-radius: ${unit(1)};
  cursor: pointer;
  border: 0;
  transition: all 100ms linear;

  &:hover {
    color: ${color.brand};
  }
`;

export default Button;
