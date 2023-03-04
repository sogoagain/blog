import React from "react";

import styled from "@emotion/styled";

import { Player } from "@lottiefiles/react-lottie-player";

import BitcoinSuccess from "./bitcoin_success.json";

import { unit } from "../../styles";

const HeaderWrapper = styled.h2({
  marginBottom: unit(3),
});

const TextWrapper = styled.p({
  margin: `${unit(1)} 0`,
});

export default function PaymentCompleted({ amount }) {
  return (
    <div>
      <HeaderWrapper>감사합니다 🎉</HeaderWrapper>
      <TextWrapper>소중한 {amount.toLocaleString("en-US")} sats</TextWrapper>
      <TextWrapper>저에게 큰 힘이 됩니다! 🙏</TextWrapper>
      <Player
        autoplay
        loop
        src={BitcoinSuccess}
        style={{ height: unit(40), width: unit(40) }}
      />
    </div>
  );
}
