const React = require("react");

module.exports = jest.fn().mockImplementation(({ ...rest }) =>
  React.createElement(
    "div",
    {
      ...rest,
    },
    "댓글입니다",
  ),
);
