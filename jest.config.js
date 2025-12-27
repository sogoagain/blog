module.exports = {
  testEnvironment: `jsdom`,
  transform: {
    "^.+\\.jsx?$": `<rootDir>/jest.preprocess.js`,
  },
  moduleNameMapper: {
    ".+\\.(css|styl|less|sass|scss)$": `identity-obj-proxy`,
    ".+\\.(jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": `<rootDir>/__mocks__/file-mock.js`,
    ".+\\.(svg)$": `<rootDir>/__mocks__/svg-mock.js`,
  },
  testPathIgnorePatterns: [`node_modules`, `\\.cache`, `<rootDir>.*/public`],
  transformIgnorePatterns: [
    `node_modules/(?!(gatsby|gatsby-script|gatsby-link)/)`,
  ],
  globals: {
    __PATH_PREFIX__: ``,
  },
  setupFiles: [`<rootDir>/loadershim.js`, "jest-canvas-mock"],
  setupFilesAfterEnv: [
    "<rootDir>/jest.setup.js",
    "given2/setup",
    "jest-plugin-context/setup",
  ],
};
