import React from "react";

import { useStaticQuery } from "gatsby";

import { render, screen } from "../testUtils";

import BitcoinAddressContainer from "./BitcoinAddressContainer";

import SITE_QUERY from "../__fixtures__/siteQuery";

describe("BitcoinAddressContainer", () => {
  beforeEach(() => {
    useStaticQuery.mockReturnValue({
      ...SITE_QUERY,
    });

    render(<BitcoinAddressContainer />);
  });

  it("비트코인 주소를 출력한다", () => {
    const { bitcoinAddress } = SITE_QUERY.site.siteMetadata;

    const addressEl = screen.getByText(bitcoinAddress);

    expect(addressEl).toBeInTheDocument();
    expect(addressEl.closest("a")).toHaveAttribute(
      "href",
      `bitcoin:${bitcoinAddress}`
    );
  });

  it("비트코인 주소 QR 코드를 출력한다", () => {
    const qrEl = screen.getByTestId("bitcoin-qr-element");

    expect(qrEl).toBeInTheDocument();
  });
});
