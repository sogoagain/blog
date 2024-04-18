import React from "react";

import styled from "@emotion/styled";

import { Player } from "@lottiefiles/react-lottie-player";

import BitcoinSuccess from "./bitcoin_success.json";

const LottiePlayerWrapper = styled.div`
  width: 240px;
  height: 240px;
`;

export default function PaymentCompleted() {
  return (
    <LottiePlayerWrapper data-testid="lottie-player">
      <Player autoplay loop src={BitcoinSuccess} />
    </LottiePlayerWrapper>
  );
}
