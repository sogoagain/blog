const React = require("react");

const gatsbyPluginImage = jest.requireActual("gatsby-plugin-image");

module.exports = {
  ...gatsbyPluginImage,
  StaticImage: jest.fn().mockImplementation(({ ...rest }) =>
    React.createElement("img", {
      ...rest,
    })
  ),
};
