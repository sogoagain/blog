const React = require("react");

module.exports = {
  ReactComponent: jest.fn().mockImplementation(({ ...rest }) =>
    React.createElement("img", {
      ...rest,
    }),
  ),
};
