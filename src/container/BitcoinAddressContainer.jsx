import React, { useEffect, useRef } from "react";

import { graphql, useStaticQuery } from "gatsby";

import styled from "@emotion/styled";

import Anchor from "../components/Anchor";

import BitcoinIcon from "../images/icons/bitcoin.png";

import { unit, color } from "../styles";

const BitcoinAddressSection = styled.div({
  padding: `${unit(4)} ${unit(2)}`,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

const AddressWrapper = styled.p({
  margin: `${unit(1)} 0`,
});

const EmWrapper = styled.em({
  marginTop: unit(5),
});

const SatoshiAnchorWrapper = styled(Anchor)`
  color: ${color.bitcoin};
`;

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

  useEffect(async () => {
    const { default: QRCodeStyling } = await import("qr-code-styling");
    const qrCodeStyling = new QRCodeStyling({
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
    qrCodeStyling.append(qrRef.current);
  }, []);

  return (
    <BitcoinAddressSection>
      <Anchor href={`bitcoin:${bitcoinAddress}`} target="_blank">
        <div data-testid="bitcoin-qr-element" ref={qrRef} />
        <AddressWrapper>{bitcoinAddress}</AddressWrapper>
      </Anchor>
      <EmWrapper>
        Pay my respects to{" "}
        <SatoshiAnchorWrapper
          href="https://bitcoin.org/bitcoin.pdf"
          target="_blank"
        >
          Satoshi Nakamoto
        </SatoshiAnchorWrapper>
      </EmWrapper>
    </BitcoinAddressSection>
  );
}
