module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  collectCoverage: true,
  coverageReporters: ["text", "json"],
  collectCoverageFrom: ["src/**/*.{ts,tsx}"],
  testPathIgnorePatterns: ["/node_modules/", "/build/"],
  modulePathIgnorePatterns: [".*__mocks__.*"]
};
