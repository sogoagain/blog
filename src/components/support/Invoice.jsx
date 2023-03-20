import React, { useState } from "react";

import styled from "@emotion/styled";

import Alert from "../Alert";
import Anchor from "../Anchor";
import InvoiceQr from "./InvoiceQr";

import { unit } from "../../styles";

const BlurWrapper = styled.div({
  filter: `blur(${unit(1)})`,
});

export default function Invoice({ invoice, expired }) {
  const [copyStatus, setCopyStatus] = useState(null);

  const handleCopyClick = async () => {
    await navigator.clipboard.writeText(invoice.payment_request);
    setCopyStatus("복사되었습니다!");
  };

  if (expired) {
    return (
      <BlurWrapper>
        <InvoiceQr invoice={invoice} />
      </BlurWrapper>
    );
  }

  return (
    <div>
      <Anchor href={`lightning:${invoice.payment_request}`} target="_blank">
        <InvoiceQr invoice={invoice} />
      </Anchor>
      <div>
        {copyStatus && <Alert message={copyStatus} />}
        <button type="button" onClick={handleCopyClick}>
          인보이스 복사하기
        </button>
      </div>
    </div>
  );
}
