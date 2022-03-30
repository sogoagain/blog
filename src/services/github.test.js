import { fetchGithubUser } from "./github";

import GITHUB_USER from "../__fixtures__/githubUser";

describe("github", () => {
  const mockFetch = (data) => {
    global.fetch = jest.fn().mockResolvedValue({
      async json() {
        return data;
      },
      ok: given.ok,
    });
  };

  describe("fetchGithubUser", () => {
    context("데이터를 성공적으로 가져오면", () => {
      beforeEach(() => {
        given("ok", () => true);
        mockFetch(GITHUB_USER);
      });

      it("Github 사용자 정보를 반환한다", async () => {
        const githubUser = await fetchGithubUser("sogoagain");

        expect(githubUser).toEqual(GITHUB_USER);
      });
    });

    context("데이터를 가져오는데 실패하면", () => {
      beforeEach(() => {
        given("ok", () => false);
        mockFetch({});
      });

      it("Error 객체를 던진다", async () => {
        try {
          await fetchGithubUser();
        } catch (err) {
          expect(err.message).toEqual(
            "Github User 데이터를 가져오지 못했습니다."
          );
        }
      });
    });
  });
});
