import React from "react";
import { render } from "@testing-library/react";

import NotFoundPage from "./404";

describe("NotFoundPage", () => {
  it("페이지 제목을 표기한다", () => {
    const { container } = render(<NotFoundPage />);

    expect(container).toHaveTextContent("Not found");
  });

  it("상세 설명을 출력한다", () => {
    const { container } = render(<NotFoundPage />);

    expect(container).toHaveTextContent(
      "we couldn’t find what you were looking for."
    );
  });
});
