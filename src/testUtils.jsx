/* eslint-disable react/prop-types */
/* eslint-disable import/no-extraneous-dependencies */
import React from "react";
import { render as rtlRender } from "@testing-library/react";
import { Provider } from "react-redux";

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
