import postsReducer, { toggleTag } from "./postsSlice";

describe("posts reducer", () => {
  const initialPostsState = {
    selectedTag: null,
  };

  describe("toggleTag", () => {
    it("initial state에서 토글하면 선택된 태그로 설정된다", () => {
      const previousState = {
        ...initialPostsState,
      };

      const state = postsReducer(previousState, toggleTag("tag1"));

      expect(state.selectedTag).toBe("tag1");
    });

    it("선택된 태그와 같은 태그를 토글하면 null이 된다", () => {
      const previousState = {
        selectedTag: "tag1",
      };

      const state = postsReducer(previousState, toggleTag("tag1"));

      expect(state.selectedTag).toBe(null);
    });

    it("다른 태그를 토글하면 선택된 태그가 변경된다", () => {
      const previousState = {
        selectedTag: "tag1",
      };

      const state = postsReducer(previousState, toggleTag("tag2"));

      expect(state.selectedTag).toBe("tag2");
    });
  });
});
