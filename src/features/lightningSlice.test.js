/* eslint-disable no-promise-executor-return */
import { createStore } from "../testUtils";

import lightningReducer, {
  setInvoice,
  setSettled,
  setExpired,
  setLoading,
  setError,
  createInvoice,
} from "./lightningSlice";

import {
  createLightningInvoice,
  lookupLightningInvoice,
} from "../services/blog";

import LIGHTNING_INVOICE from "../__fixtures__/lightningInvoice";
import LOOKUP_LIGHTNING_INVOICE from "../__fixtures__/lookupLightningInvoice";

jest.mock("../services/blog");

describe("lightning reducer", () => {
  const initialLightningState = {
    invoice: {
      value: 0,
      memo: "",
      expiry: 0,
      r_hash: "",
      payment_request: "",
    },
    settled: false,
    expired: false,
    loading: false,
    error: false,
  };

  describe("setInvoice", () => {
    it("Invoice 정보를 변경한다", () => {
      const previousState = initialLightningState;

      const state = lightningReducer(
        previousState,
        setInvoice(LIGHTNING_INVOICE)
      );

      expect(state.invoice.payment_request).toEqual(
        LIGHTNING_INVOICE.payment_request
      );
    });
  });

  describe("setSettled", () => {
    it("정산 여부를 변경한다", () => {
      const previousState = initialLightningState;

      const state = lightningReducer(previousState, setSettled(true));

      expect(state.settled).toEqual(true);
    });
  });

  describe("setExpired", () => {
    it("만료 여부를 변경한다", () => {
      const previousState = initialLightningState;

      const state = lightningReducer(previousState, setExpired(true));

      expect(state.expired).toEqual(true);
    });
  });

  describe("setLoading", () => {
    it("로딩 여부를 변경한다", () => {
      const previousState = initialLightningState;

      const state = lightningReducer(previousState, setLoading(true));

      expect(state.loading).toEqual(true);
    });
  });

  describe("setError", () => {
    it("에러 여부를 변경한다", () => {
      const previousState = initialLightningState;

      const state = lightningReducer(previousState, setError(true));

      expect(state.error).toEqual(true);
    });
  });
});

describe("lightning actions", () => {
  let store;

  beforeEach(() => {
    store = createStore();
  });

  describe("createInvoice", () => {
    beforeEach(() => {
      createLightningInvoice.mockClear();
      lookupLightningInvoice.mockClear();
    });

    context("인보이스를 성공적으로 발행한다면", () => {
      beforeEach(() => {
        createLightningInvoice.mockResolvedValue(LIGHTNING_INVOICE);
        lookupLightningInvoice.mockResolvedValue(LOOKUP_LIGHTNING_INVOICE);
      });

      it("인보이스 정보를 설정한다", async () => {
        await store.dispatch(createInvoice());

        const {
          lightning: { invoice },
        } = store.getState();

        expect(invoice).toEqual(LIGHTNING_INVOICE);
      });

      context("인보이스가 만료되면", () => {
        beforeEach(() => {
          createLightningInvoice.mockResolvedValue({
            ...LIGHTNING_INVOICE,
            expiry: 1,
          });
        });

        it("expired 상태를 true로 변경한다", async () => {
          await store.dispatch(createInvoice());

          await new Promise((resolve) => setTimeout(resolve, 1001));

          const {
            lightning: { expired },
          } = store.getState();

          expect(expired).toEqual(true);
        });
      });

      context("인보이스가 정산되었다면", () => {
        beforeEach(() => {
          lookupLightningInvoice.mockResolvedValue({
            settled: true,
          });
        });

        it("settled 상태를 true로 변경한다", async () => {
          await store.dispatch(createInvoice());

          await new Promise((resolve) => setTimeout(resolve, 3001));

          const {
            lightning: { settled },
          } = store.getState();

          expect(settled).toEqual(true);
        });
      });

      context("인보이스 정산 정보를 가져오지 못하면", () => {
        beforeEach(() => {
          lookupLightningInvoice.mockRejectedValue(
            new Error("인보이스 상태를 조회할 수 없습니다.")
          );
        });

        it("settled 상태를 false로 설정한다", async () => {
          await store.dispatch(createInvoice());

          await new Promise((resolve) => setTimeout(resolve, 3001));

          const {
            lightning: { settled },
          } = store.getState();

          expect(settled).toEqual(false);
        });
      });
    });

    context("인보이스 발행에 실패한다면", () => {
      beforeEach(() => {
        createLightningInvoice.mockRejectedValue(
          new Error("인보이스를 발행하지 못했습니다.")
        );
      });

      it("error 상태를 true로 변경한다", async () => {
        const { lightning: previousState } = store.getState();

        await store.dispatch(createInvoice());

        const { lightning } = store.getState();

        expect(lightning.invoice).toBe(previousState.invoice);
        expect(lightning.settled).toBe(previousState.settled);
        expect(lightning.error).toBe(true);
      });
    });
  });
});
