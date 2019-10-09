const path = require("path");

module.exports = {
  parser: "babel-eslint",

  env: {
    browser: true
  },

  settings: {
    "import/resolver": {
      webpack: {
        config: path.resolve(__dirname, "..", "..", "webpack.common.js")
      }
    }
  },

  globals: {
    lcrfAsService: true,
    BUILD_TIME: true,
    DEBUG: true,
    ENV: true,
    GIT_BRANCH: true,
    GIT_REVISION: true,
    GIT_SHORT_REVISION: true
  },

  overrides: {
    files: [
      "components/**/story.{js,jsx}",
      "components/**/_story.{js,jsx}",
      "routes/**/story.{js,jsx}",
      "routes/**/_story.{js,jsx}"
    ],

    env: {
      browser: true,
      node: true
    },

    rules: {
      "react/jsx-key": "off"
    }
  }
};
