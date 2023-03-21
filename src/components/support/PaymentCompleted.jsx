import React from "react";

import styled from "@emotion/styled";

import { Player } from "@lottiefiles/react-lottie-player";

import BitcoinSuccess from "./bitcoin_success.json";

const LottiePlayerWrapper = styled.div`
  width: 320px;
  height: 320px;
`;

export default function PaymentCompleted({ amount }) {
  return (
    <>
      <LottiePlayerWrapper>
        <Player autoplay loop src={BitcoinSuccess} />
      </LottiePlayerWrapper>
      <h3>감사합니다 🎉</h3>
      <p>
        소중한 {amount.toLocaleString("en-US")} sats <br />
        저에게 큰 힘이 됩니다! 🙏
      </p>
    </>
  );
}
