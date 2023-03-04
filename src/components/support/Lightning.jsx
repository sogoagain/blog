import React from "react";

import styled from "@emotion/styled";

import Alert from "../Alert";
import Anchor from "../Anchor";
import Button from "../Button";
import Invoice from "./Invoice";
import PaymentCompleted from "./PaymentCompleted";

import { unit } from "../../styles";

const BlurWrapper = styled.div({
  filter: `blur(${unit(1)})`,
});

export default function Lightning({
  invoice,
  settled,
  expired,
  onCreateInvoice,
}) {
  if (settled) {
    return <PaymentCompleted />;
  }

  if (expired) {
    return (
      <>
        <BlurWrapper>
          <Invoice invoice={invoice} />
        </BlurWrapper>
        <Alert message="인보이스가 만료되었습니다." />
        <Button type="button" onClick={onCreateInvoice}>
          다시 발급하기
        </Button>
      </>
    );
  }

  return (
    <Anchor href={`lightning:${invoice.payment_request}`} target="_blank">
      <Invoice invoice={invoice} />
    </Anchor>
  );
}
