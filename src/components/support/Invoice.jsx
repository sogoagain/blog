import React, { useState, useEffect, useRef } from "react";

import styled from "@emotion/styled";

import Alert from "../Alert";
import Anchor from "../Anchor";
import Button from "../Button";

import LightningIcon from "../../images/icons/lightning.png";

import { unit, color } from "../../styles";

const BlurWrapper = styled.div({
  filter: `blur(${unit(1)})`,
});

const TextWrapper = styled.p({
  margin: `${unit(1)} 0`,
});

const CopyWrapper = styled.div({
  marginTop: unit(3),
});

export default function Invoice({ invoice, expired }) {
  const [copyStatus, setCopyStatus] = useState(null);
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

  const handleCopyClick = async () => {
    await navigator.clipboard.writeText(invoice.payment_request);
    setCopyStatus("복사되었습니다!");
  };

  if (expired) {
    return (
      <BlurWrapper>
        <div data-testid="lightning-qr-element" ref={qrRef} />
        <TextWrapper>{invoice.value.toLocaleString("en-US")} sats</TextWrapper>
        <TextWrapper>{invoice.memo}</TextWrapper>
      </BlurWrapper>
    );
  }

  return (
    <div>
      <Anchor href={`lightning:${invoice.payment_request}`} target="_blank">
        <div data-testid="lightning-qr-element" ref={qrRef} />
        <TextWrapper>{invoice.value.toLocaleString("en-US")} sats</TextWrapper>
        <TextWrapper>for {invoice.memo}</TextWrapper>
      </Anchor>
      <CopyWrapper>
        {copyStatus && <Alert message={copyStatus} />}
        <Button type="button" onClick={handleCopyClick}>
          인보이스 복사하기
        </Button>
      </CopyWrapper>
    </div>
  );
}
