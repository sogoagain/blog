import React, { useEffect, useRef } from "react";

import { graphql, useStaticQuery } from "gatsby";

import styled from "@emotion/styled";

import QRCode from "qrcode";

import Anchor from "../components/Anchor";

import { unit } from "../styles";

const BitcoinAddressSection = styled.section({
  padding: `${unit(3)} ${unit(2)}`,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

const query = graphql`
  query {
    site {
      siteMetadata {
        bitcoinAddress
      }
    }
  }
`;

export default function BitcoinAddressContainer() {
  const {
    site: {
      siteMetadata: { bitcoinAddress },
    },
  } = useStaticQuery(query);
  const qrCanvasEl = useRef(null);

  useEffect(() => {
    QRCode.toCanvas(qrCanvasEl.current, bitcoinAddress, {
      errorCorrectionLevel: "H",
    });
  }, []);

  return (
    <BitcoinAddressSection>
      <canvas data-testid="bitcoin-qr-element" ref={qrCanvasEl} />
      <Anchor href={`bitcoin:${bitcoinAddress}`} target="_blank">
        {bitcoinAddress}
      </Anchor>
    </BitcoinAddressSection>
  );
}
