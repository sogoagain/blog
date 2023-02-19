import React, { useEffect, useRef } from "react";

import { useDispatch, useSelector } from "react-redux";

import styled from "@emotion/styled";

import Alert from "../components/Alert";
import Anchor from "../components/Anchor";
import Button from "../components/Button";
import CheckmarkAnimation from "../components/CheckmarkAnimation";
import Spinner from "../components/Spinner";

import { createInvoice, setExpired } from "../features/lightningSlice";

import LightningIcon from "../images/icons/lightning.png";

import { unit, color } from "../styles";

const LightningSection = styled.div({
  minHeight: unit(40),
  padding: `${unit(4)} ${unit(2)}`,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-between",
});

const ThanksWrapper = styled.div({
  margin: `${unit(10)} 0`,
});

const EmWrapper = styled.em({
  marginTop: unit(5),
});

const SatoshiAnchorWrapper = styled(Anchor)`
  color: ${color.bitcoin};
`;

export default function LightningContainer() {
  const dispatch = useDispatch();
  const { invoice, settled, expired, loading, error } = useSelector(
    (state) => state.lightning
  );

  const qrRef = useRef(null);

  const handleCreateInvoice = () => {
    dispatch(createInvoice());
  };

  const drawInvoiceQr = async () => {
    if (qrRef.current) {
      const svgElement = qrRef.current.querySelector("svg");
      if (svgElement) {
        qrRef.current.removeChild(svgElement);
      }
    }
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
    if (!invoice.payment_request) {
      dispatch(createInvoice());
      return;
    }
    await drawInvoiceQr();
  }, []);

  useEffect(async () => {
    if (!invoice.payment_request) {
      return;
    }
    await drawInvoiceQr();
  }, [invoice.payment_request]);

  return (
    <LightningSection>
      {loading && <Spinner />}
      {error && (
        <Alert message="라이트닝 인보이스를 발행하지 못했습니다. 잠시 후 다시 확인해주세요." />
      )}
      <Anchor
        style={{
          display: loading || settled || error ? "none" : undefined,
          filter: expired ? `blur(${unit(1)})` : undefined,
        }}
        href={`lightning:${invoice.payment_request}`}
        target="_blank"
      >
        <div data-testid="lightning-qr-element" ref={qrRef} />
        <p>{invoice.value.toLocaleString("en-US")} sats</p>
      </Anchor>
      {!loading && settled && (
        <ThanksWrapper>
          <h1>⚡️ 감사합니다! 🤙</h1>
          <CheckmarkAnimation
            duration={800}
            size={50}
            color={color.lightning}
          />
        </ThanksWrapper>
      )}
      {!loading && !settled && expired && (
        <>
          <Alert message="인보이스가 만료되었습니다." />
          <Button type="button" onClick={handleCreateInvoice}>
            다시 발급하기
          </Button>
        </>
      )}
      <EmWrapper>
        Pay my respects to{" "}
        <SatoshiAnchorWrapper
          href="https://bitcoin.org/bitcoin.pdf"
          target="_blank"
        >
          Satoshi Nakamoto
        </SatoshiAnchorWrapper>
      </EmWrapper>
    </LightningSection>
  );
}
