const path = require("path")

module.exports = {
  rootDir: path.resolve(__dirname, "../../"),
  moduleFileExtensions: ["js", "json", "vue"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1"
  },
  transform: {
    ".*\\.(vue)$": "<rootDir>/node_modules/vue-jest",
    "^.+\\.js$": "<rootDir>/node_modules/babel-jest"
  },
  snapshotSerializers: ["<rootDir>/node_modules/jest-serializer-vue"],
  setupFiles: ["<rootDir>/test/unit/setup"],
  mapCoverage: true,
  coverageDirectory: "<rootDir>/test/unit/coverage",
  collectCoverageFrom: [
    "src/**/*.{js,vue}",
    "!src/main.js",
    "!**/node_modules/**"
  ]
}
