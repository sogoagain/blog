const React = require("react");

const gatsbyPluginImage = jest.requireActual("gatsby-plugin-image");

module.exports = {
  ...gatsbyPluginImage,
  StaticImage: jest.fn().mockImplementation(({ ...rest }) =>
    React.createElement("img", {
      ...rest,
      src: "mocked-image-src.jpg",
    }),
  ),
  GatsbyImage: jest.fn().mockImplementation(({ ...rest }) =>
    React.createElement("img", {
      ...rest,
      src: "mocked-image-src.jpg",
    }),
  ),
  getImage: jest.fn(),
};
