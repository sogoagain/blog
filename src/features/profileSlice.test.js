import profileReducer, { setImage } from "./profileSlice";

describe("profile reducer", () => {
  describe("setImage", () => {
    it("이미지 src를 변경한다", () => {
      const src = "https://avatars.githubusercontent.com/u/23417465?v=4";
      const previousState = {
        image: {
          src: "",
        },
      };

      const state = profileReducer(previousState, setImage({ src }));

      expect(state.image.src).toEqual(src);
    });
  });
});
