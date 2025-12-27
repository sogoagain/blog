import React, { act } from "react";

import { render, screen } from "@testing-library/react";

import Spinner from "./Spinner";

const delay = (ms) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

describe("<Spinner/>", () => {
  beforeEach(() => {
    render(<Spinner loadingText="로딩" />);
  });

  it("시간의 흐름에 따라 로딩 텍스트를 출력한다", async () => {
    expect(screen.getByText("로딩")).toBeInTheDocument();

    await act(() => delay(500));

    expect(screen.getByText("로딩.")).toBeInTheDocument();

    await act(() => delay(500));

    expect(screen.getByText("로딩..")).toBeInTheDocument();

    await act(() => delay(500));

    expect(screen.getByText("로딩...")).toBeInTheDocument();

    await act(() => delay(500));

    expect(screen.getByText("로딩")).toBeInTheDocument();
  });
});
