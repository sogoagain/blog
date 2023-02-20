import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import styled from "@emotion/styled";

import Alert from "../components/Alert";
import Anchor from "../components/Anchor";
import Button from "../components/Button";
import CheckmarkAnimation from "../components/CheckmarkAnimation";
import LightningQr from "../components/LightningQr";
import Spinner from "../components/Spinner";

import { createInvoice } from "../features/lightningSlice";

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

  const handleCreateInvoice = () => {
    dispatch(createInvoice());
  };

  useEffect(async () => {
    if (!invoice.payment_request) {
      dispatch(createInvoice());
    }
  }, []);

  return (
    <LightningSection>
      {loading && <Spinner />}
      {error && (
        <Alert message="라이트닝 인보이스를 발행하지 못했습니다. 잠시 후 다시 확인해주세요." />
      )}
      {!loading && !settled && !error && (
        <Anchor
          style={{
            filter: expired ? `blur(${unit(1)})` : undefined,
          }}
          href={`lightning:${invoice.payment_request}`}
          target="_blank"
        >
          <LightningQr invoice={invoice} />
        </Anchor>
      )}
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
