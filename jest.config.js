/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testPathIgnorePatterns: ["/node_modules/", "/cve-schema/", "/cvelist/"],
  testMatch: ["**/?(*.)+(spec|test).[jt]s?(x)"],
};
