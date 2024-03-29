import {
  fetchBooks,
  createLightningInvoice,
  lookupLightningInvoice,
} from "./blog";

import READING_LIST from "../__fixtures__/books";
import LIGHTNING_INVOICE from "../__fixtures__/lightningInvoice";
import LOOKUP_LIGHTNING_INVOICE from "../__fixtures__/lookupLightningInvoice";

describe("blog", () => {
  const mockFetch = (data) => {
    global.fetch = jest.fn().mockResolvedValue({
      async json() {
        return data;
      },
      ok: given.ok,
    });
  };

  describe("fetchBooks", () => {
    context("데이터를 성공적으로 가져오면", () => {
      beforeEach(() => {
        given("ok", () => true);
        mockFetch(READING_LIST);
      });

      it("독서목록을 반환한다", async () => {
        const books = await fetchBooks();

        expect(books).toEqual(READING_LIST);
      });
    });

    context("데이터를 가져오는데 실패하면", () => {
      beforeEach(() => {
        given("ok", () => false);
        mockFetch({});
      });

      it("Error 객체를 던진다", async () => {
        try {
          await fetchBooks();
        } catch (err) {
          expect(err.message).toEqual("독서목록을 불러오지 못했습니다.");
        }
      });
    });
  });

  describe("createLightningInvoice", () => {
    context("인보이스를 성공적으로 발행하면", () => {
      beforeEach(() => {
        given("ok", () => true);
        mockFetch(LIGHTNING_INVOICE);
      });

      it("인보이스 정보를 반환한다", async () => {
        const invoice = await createLightningInvoice({
          amount: 9409,
          memo: "오 ~ 막걸리 좋아요!",
        });

        expect(invoice).toEqual(LIGHTNING_INVOICE);
      });
    });

    context("인보이스를 발행하는데 실패하면", () => {
      beforeEach(() => {
        given("ok", () => false);
        mockFetch({});
      });

      it("Error 객체를 던진다", async () => {
        try {
          await createLightningInvoice({
            amount: 9409,
            memo: "오 ~ 막걸리 좋아요!",
          });
        } catch (err) {
          expect(err.message).toEqual("인보이스를 발행하지 못했습니다.");
        }
      });
    });
  });

  describe("lookupLightningInvoice", () => {
    context("인보이스 상태를 성공적으로 조회하면", () => {
      beforeEach(() => {
        given("ok", () => true);
        mockFetch(LOOKUP_LIGHTNING_INVOICE);
      });

      it("정산 여부를 반환한다", async () => {
        const invoice = await lookupLightningInvoice({
          r_hash: LIGHTNING_INVOICE.r_hash,
        });

        expect(invoice).toEqual(LOOKUP_LIGHTNING_INVOICE);
      });
    });

    context("인보이스 상태를 조회하는데 실패하면", () => {
      beforeEach(() => {
        given("ok", () => false);
        mockFetch({});
      });

      it("Error 객체를 던진다", async () => {
        try {
          await lookupLightningInvoice({
            r_hash: LIGHTNING_INVOICE.r_hash,
          });
        } catch (err) {
          expect(err.message).toEqual("인보이스 상태를 조회할 수 없습니다.");
        }
      });
    });
  });
});
