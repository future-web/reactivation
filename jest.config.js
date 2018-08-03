// TODO: use mjs modules once supported by node
module.exports = {
  testURL: "http://localhost", // remove once the following solved: https://github.com/facebook/jest/issues/6766#issuecomment-409597002
  moduleNameMapper: {
    "\\.css$": "identity-obj-proxy"
  },
  collectCoverageFrom: ["src/**/*"]
};
