const React = require("react");

module.exports = jest
  .fn()
  .mockImplementation(() => React.createElement("div", {}, "댓글입니다"));
