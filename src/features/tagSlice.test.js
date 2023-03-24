import tagReducer, { toggleTag } from "./tagSlice";

describe("tag reducer", () => {
  const initialTagState = {
    selected: null,
  };

  describe("toggleTag", () => {
    it("initial state에서 토글하면 선택된 태그로 설정된다", () => {
      const previousState = {
        ...initialTagState,
      };

      const state = tagReducer(previousState, toggleTag("tag1"));

      expect(state.selected).toBe("tag1");
    });

    it("선택된 태그와 같은 태그를 토글하면 null이 된다", () => {
      const previousState = {
        selected: "tag1",
      };

      const state = tagReducer(previousState, toggleTag("tag1"));

      expect(state.selected).toBe(null);
    });

    it("다른 태그를 토글하면 선택된 태그가 변경된다", () => {
      const previousState = {
        selected: "tag1",
      };

      const state = tagReducer(previousState, toggleTag("tag2"));

      expect(state.selected).toBe("tag2");
    });
  });
});
