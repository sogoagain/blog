module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  globals: {
    context: "readonly",
    given: "readonly",
  },
  extends: ["airbnb", "airbnb/hooks", "prettier"],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    "react/prop-types": "off",
    "react/no-danger": "off",
    "react/jsx-props-no-spreading": "off",
    "import/prefer-default-export": "off",
    "import/no-extraneous-dependencies": "off",
    "import/no-unresolved": ["error", { ignore: ["^@giscus/react$"] }],
    camelcase: "off",
    "react/no-unknown-property": ["error", { ignore: ["css"] }],
    "jsx-a11y/media-has-caption": "off",
    "no-console": "off",
    "react-hooks/exhaustive-deps": "off",
  },
};
