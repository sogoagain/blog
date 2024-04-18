import React, { useState } from "react";

import styled from "@emotion/styled";

import Alert from "../Alert";
import Anchor from "../Anchor";
import InvoiceQr from "./InvoiceQr";

const BlurWrapper = styled.div`
  filter: blur(0.5rem);
  margin: 0 0 1rem;
`;

const InvoiceWrapper = styled.div`
  margin: 0 0 1rem;
`;

export default function Invoice({ invoice, expired }) {
  const [copyStatus, setCopyStatus] = useState(null);

  const handleCopyClick = async () => {
    await navigator.clipboard.writeText(invoice.payment_request);
    setCopyStatus("복사 완료! 지갑에 붙여넣어 주세요.");
  };

  if (expired) {
    return (
      <BlurWrapper>
        <InvoiceQr invoice={invoice} />
      </BlurWrapper>
    );
  }

  return (
    <>
      <InvoiceWrapper>
        <Anchor href={`lightning:${invoice.payment_request}`}>
          <InvoiceQr invoice={invoice} />
        </Anchor>
      </InvoiceWrapper>
      <div>
        {copyStatus && <Alert message={copyStatus} />}
        <button type="button" onClick={handleCopyClick}>
          인보이스 복사하기
        </button>
      </div>
    </>
  );
}
