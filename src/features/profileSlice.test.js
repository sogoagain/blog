import { createStore } from "../testUtils";

import profileReducer, { setImage, loadProfileImageSrc } from "./profileSlice";

import { fetchGithubUser } from "../services/github";

import GITHUB_USER from "../__fixtures__/githubUser";

jest.mock("../services/github");

describe("profile reducer", () => {
  const initialProfileState = {
    image: {
      src: null,
    },
  };

  describe("setImage", () => {
    it("이미지 src를 변경한다", () => {
      const src = "https://avatars.githubusercontent.com/u/23417465?v=4";
      const previousState = initialProfileState;

      const state = profileReducer(previousState, setImage({ src }));

      expect(state.image.src).toEqual(src);
    });
  });
});

describe("profile actions", () => {
  let store;

  beforeEach(() => {
    store = createStore();
  });

  describe("loadProfileImageSrc", () => {
    beforeEach(() => {
      fetchGithubUser.mockClear();
    });

    context("프로필 이미지 경로를 성공적으로 불러오면", () => {
      beforeEach(() => {
        fetchGithubUser.mockResolvedValue(GITHUB_USER);
      });

      it("image.src를 Github 프로필 이미지 경로로 설정한다", async () => {
        await store.dispatch(loadProfileImageSrc("octocat"));

        const { profile } = store.getState();

        expect(profile.image.src).toBe(
          "https://github.com/images/error/octocat_happy.gif"
        );
      });
    });

    context("프로필 이미지 경로를 불러오는데 실패하면", () => {
      beforeEach(() => {
        fetchGithubUser.mockRejectedValue(
          new Error("Github User 데이터를 가져오지 못했습니다.")
        );
      });

      it("image.src를 null로 설정한다", async () => {
        await store.dispatch(loadProfileImageSrc("octocat"));

        const { profile } = store.getState();

        expect(profile.image.src).toBe(null);
      });
    });
  });
});
