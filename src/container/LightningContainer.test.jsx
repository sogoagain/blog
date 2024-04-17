/* eslint-disable no-promise-executor-return */
import React from "react";

import { Provider } from "react-redux";

import { act } from "react-dom/test-utils";

import { render as rtlRender } from "@testing-library/react";

import { render, createStore, screen, fireEvent } from "../testUtils";

import LightningContainer from "./LightningContainer";

import { createInvoice } from "../features/lightningSlice";

import {
  createLightningInvoice,
  lookupLightningInvoice,
} from "../services/blog";

import LIGHTNING_INVOICE from "../__fixtures__/lightningInvoice";
import LOOKUP_LIGHTNING_INVOICE from "../__fixtures__/lookupLightningInvoice";

jest.mock("../services/blog");

describe("<LightningContainer/>", () => {
  function requestInvoice() {
    fireEvent.change(screen.getByPlaceholderText("2100"), {
      target: { value: "9a4b0c9d" },
    });
    fireEvent.change(screen.getByPlaceholderText("PIZZA 🍕"), {
      target: { value: "오 ~ 막걸리 좋아요!" },
    });
    fireEvent.submit(screen.getByRole("button", { name: "인보이스 발급하기" }));
  }

  beforeEach(() => {
    createLightningInvoice.mockClear();
    createLightningInvoice.mockResolvedValue(LIGHTNING_INVOICE);
    lookupLightningInvoice.mockClear();
    lookupLightningInvoice.mockResolvedValue(LOOKUP_LIGHTNING_INVOICE);
    navigator.clipboard = {
      writeText: jest.fn(),
    };
  });

  context("인보이스를 성공적으로 발행했을 때", () => {
    beforeEach(async () => {
      render(<LightningContainer />);
      await act(async () => {
        requestInvoice();
      });
    });

    it("라이트닝 인보이스 QR 코드를 출력한다", () => {
      const qrEl = screen.getByTestId("lightning-qr-element");

      expect(qrEl).toBeInTheDocument();
      expect(qrEl.closest("a")).toHaveAttribute(
        "href",
        `lightning:${LIGHTNING_INVOICE.payment_request}`,
      );
    });

    it("사토시 수량을 출력한다", () => {
      const amountEl = screen.getByText("9,409 sats for 오 ~ 막걸리 좋아요!");

      expect(amountEl).toBeInTheDocument();
    });

    it("인보이스 텍스트를 복사할 수 있다", async () => {
      await act(async () => {
        fireEvent.click(
          screen.getByRole("button", { name: "인보이스 복사하기" }),
        );
      });

      expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
        "lnbc498132jhakjs...",
      );
    });

    context("인보이스가 만료되면", () => {
      it("다시 발급하기 버튼을 출력한다", async () => {
        await act(async () => {
          await new Promise((resolve) => setTimeout(resolve, 4001));
        });

        const reissueButtonEl = screen.getByText("다시 발급하기");
        await act(async () => {
          fireEvent.click(reissueButtonEl);
        });

        expect(createLightningInvoice).toHaveBeenCalledTimes(2);
      });
    });

    context("지급이 완료되면", () => {
      beforeEach(() => {
        lookupLightningInvoice.mockResolvedValue({
          settled: true,
        });
      });

      it("감사 인사를 출력한다", async () => {
        await act(async () => {
          await new Promise((resolve) => setTimeout(resolve, 4001));
        });

        const thanksEl = screen.getByText("감사합니다 🎉");

        expect(thanksEl).toBeInTheDocument();
      });
    });
  });

  context("인보이스 발행에 실패하면", () => {
    beforeEach(async () => {
      createLightningInvoice.mockRejectedValue(
        new Error("인보이스를 발행하지 못했습니다."),
      );
      render(<LightningContainer />);
      await act(async () => {
        requestInvoice();
      });
    });

    it("오류 문구를 출력한다", () => {
      const errorEl = screen.getByText(
        "라이트닝 인보이스를 발행하지 못했습니다. 잠시 후 다시 확인해주세요.",
      );

      expect(errorEl).toBeInTheDocument();
    });
  });

  context("발행한 인보이스가 있다면", () => {
    it("렌더링 시 추가로 불러오지 않는다", async () => {
      const store = createStore();
      store.dispatch(createInvoice());

      await act(async () => {
        rtlRender(
          <Provider store={store}>
            <LightningContainer />
          </Provider>,
        );
      });

      expect(createLightningInvoice).toHaveBeenCalledTimes(1);
    });
  });
});
