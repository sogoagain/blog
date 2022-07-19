import { fetchReadingList } from "./blog";

import READING_LIST from "../__fixtures__/readingList";

describe("blog", () => {
  const mockFetch = (data) => {
    global.fetch = jest.fn().mockResolvedValue({
      async json() {
        return data;
      },
      ok: given.ok,
    });
  };

  describe("fetchReadingList", () => {
    context("데이터를 성공적으로 가져오면", () => {
      beforeEach(() => {
        given("ok", () => true);
        mockFetch(READING_LIST);
      });

      it("독서목록을 반환한다", async () => {
        const githubUser = await fetchReadingList({
          pageSize: 5,
          nextCursor: "ed6e2135-1fb3-4629-8537-ab4909d631cc",
        });

        expect(githubUser).toEqual(READING_LIST);
      });
    });
  });

  context("데이터를 가져오는데 실패하면", () => {
    beforeEach(() => {
      given("ok", () => false);
      mockFetch({});
    });

    it("Error 객체를 던진다", async () => {
      try {
        await fetchReadingList({
          pageSize: 10,
          startCursor: null,
        });
      } catch (err) {
        expect(err.message).toEqual("독서목록을 불러오지 못했습니다.");
      }
    });
  });
});
