import React from "react";

import { Provider } from "react-redux";

import { render as rtlRender } from "@testing-library/react";

import createStore from "./createStore";

function render(
  ui,
  { preloadedState, store = createStore(), ...renderOptions } = {}
) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

export * from "@testing-library/react";

export { render, createStore };
