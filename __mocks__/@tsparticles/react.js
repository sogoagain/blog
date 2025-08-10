const React = require("react");

module.exports = jest.fn().mockImplementation(({ ...rest }) =>
  React.createElement(
    "div",
    {
      ...rest,
    },
    "Particles",
  ),
);

module.exports.initParticlesEngine = jest.fn().mockReturnValue(
  new Promise((resolve) => {
    resolve("init");
  }),
);
