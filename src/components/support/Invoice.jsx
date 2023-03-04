import React, { useEffect, useRef } from "react";

import styled from "@emotion/styled";

import LightningIcon from "../../images/icons/lightning.png";

import { unit, color } from "../../styles";

const TextWrapper = styled.p({
  margin: `${unit(2)} 0`,
});

export default function Invoice({ invoice }) {
  const qrRef = useRef(null);

  const drawInvoiceQr = async () => {
    const { default: QRCodeStyling } = await import("qr-code-styling");
    const qrCodeStyling = new QRCodeStyling({
      width: 320,
      height: 320,
      type: "svg",
      data: invoice.payment_request,
      image: LightningIcon,
      dotsOptions: { type: "extra-rounded", color: color.primary },
      backgroundOptions: { color: color.background },
      cornersSquareOptions: { type: "extra-rounded", color: color.lightning },
      cornersDotOptions: { color: color.lightning },
    });
    qrCodeStyling.append(qrRef.current);
  };

  useEffect(async () => {
    await drawInvoiceQr();
  }, []);

  return (
    <>
      <div data-testid="lightning-qr-element" ref={qrRef} />
      <TextWrapper>{invoice.value.toLocaleString("en-US")} sats</TextWrapper>
      <TextWrapper>{invoice.memo}</TextWrapper>
    </>
  );
}