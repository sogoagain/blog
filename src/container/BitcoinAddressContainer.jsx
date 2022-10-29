import React, { useState, useEffect, useRef } from "react";

import { graphql, useStaticQuery } from "gatsby";

import styled from "@emotion/styled";

import QRCodeStyling from "qr-code-styling";

import Anchor from "../components/Anchor";

import BitcoinIcon from "../images/icons/bitcoin.png";

import { unit, color } from "../styles";

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

  const qrRef = useRef(null);

  const qrCode = new QRCodeStyling({
    width: 240,
    height: 240,
    type: "svg",
    data: bitcoinAddress,
    image: BitcoinIcon,
    dotsOptions: { type: "extra-rounded", color: color.primary },
    backgroundOptions: { color: color.background },
    cornersSquareOptions: { type: "extra-rounded", color: color.bitcoin },
    cornersDotOptions: { color: color.bitcoin },
  });

  useEffect(() => {
    qrCode.append(qrRef.current);
  }, []);

  return (
    <BitcoinAddressSection>
      <div data-testid="bitcoin-qr-element" ref={qrRef} />
      <Anchor href={`bitcoin:${bitcoinAddress}`} target="_blank">
        {bitcoinAddress}
      </Anchor>
    </BitcoinAddressSection>
  );
}
