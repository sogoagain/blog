import React from "react";

import Anchor from "../Anchor";

export default function RespectSatoshi() {
  return (
    <em>
      Pay my respects to{" "}
      <Anchor href="https://bitcoin.org/bitcoin.pdf" target="_blank">
        Satoshi Nakamoto
      </Anchor>
    </em>
  );
}
