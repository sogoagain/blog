import React, { useEffect, useRef } from "react";

import LightningIcon from "../../images/icons/lightning.png";

export default function InvoiceQr({ invoice }) {
  const qrRef = useRef(null);

  const drawInvoiceQr = async () => {
    const { default: QRCodeStyling } = await import("qr-code-styling");
    const qrCodeStyling = new QRCodeStyling({
      width: 320,
      height: 320,
      type: "svg",
      data: invoice.payment_request,
      image: LightningIcon,
      dotsOptions: { type: "extra-rounded", color: "#000000" },
      backgroundOptions: { color: "#FFFFFF" },
      cornersSquareOptions: { type: "extra-rounded", color: "#7b1af7" },
      cornersDotOptions: { color: "#7b1af7" },
    });
    qrCodeStyling.append(qrRef.current);
  };

  useEffect(() => {
    drawInvoiceQr();
  }, []);

  return (
    <div>
      <div data-testid="lightning-qr-element" ref={qrRef} />
      <span>
        {invoice.value.toLocaleString("en-US")} sats for {invoice.memo}
      </span>
    </div>
  );
}
