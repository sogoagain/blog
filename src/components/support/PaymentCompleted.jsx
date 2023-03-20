import React from "react";

import { Player } from "@lottiefiles/react-lottie-player";

import BitcoinSuccess from "./bitcoin_success.json";

import { unit } from "../../styles";

export default function PaymentCompleted({ amount }) {
  return (
    <div>
      <h2>감사합니다 🎉</h2>
      <p>소중한 {amount.toLocaleString("en-US")} sats</p>
      <p>저에게 큰 힘이 됩니다! 🙏</p>
      <Player
        autoplay
        loop
        src={BitcoinSuccess}
        style={{ height: unit(40), width: unit(40) }}
      />
    </div>
  );
}
