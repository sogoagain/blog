import React from "react";

import Alert from "../Alert";
import Button from "../Button";
import Invoice from "./Invoice";

export default function Lightning({ invoice, expired, onCreateInvoice }) {
  if (expired) {
    return (
      <div>
        <Invoice invoice={invoice} expired={expired} />
        <Alert message="인보이스가 만료되었습니다." />
        <Button type="button" onClick={onCreateInvoice}>
          다시 발급하기
        </Button>
      </div>
    );
  }

  return <Invoice invoice={invoice} expired={expired} />;
}
