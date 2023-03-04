import React from "react";

import styled from "@emotion/styled";

import Anchor from "../Anchor";

import { unit, color } from "../../styles";

const EmWrapper = styled.em({
  marginTop: unit(5),
});

const SatoshiAnchorWrapper = styled(Anchor)`
  color: ${color.bitcoin};
`;

export default function RespectSatoshi() {
  return (
    <EmWrapper>
      Pay my respects to{" "}
      <SatoshiAnchorWrapper
        href="https://bitcoin.org/bitcoin.pdf"
        target="_blank"
      >
        Satoshi Nakamoto
      </SatoshiAnchorWrapper>
    </EmWrapper>
  );
}
