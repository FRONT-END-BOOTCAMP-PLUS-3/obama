
export default {
  preset: "ts-jest",
  testEnvironment: "node",
  setupFiles: ["dotenv/config"],
  moduleFileExtensions: ["ts", "tsx", "js"],
  testMatch: process.env.TEST_FILE
  ? [`**/${process.env.TEST_FILE}.test.ts`]
  : ["**/tests/**/*.test.ts"],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
};
