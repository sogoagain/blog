import React from "react";

import styled from "@emotion/styled";

import Checkmark from "./Checkmark";

import { unit, color } from "../../styles";

const ThanksWrapper = styled.div({
  margin: `${unit(10)} 0`,
});

export default function PaymentCompleted() {
  return (
    <ThanksWrapper>
      <h1>⚡️ 감사합니다! 🤙</h1>
      <Checkmark duration={800} size={50} color={color.lightning} />
    </ThanksWrapper>
  );
}
