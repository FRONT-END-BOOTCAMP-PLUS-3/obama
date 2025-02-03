
export default {
  preset: "ts-jest",
  setupFiles: ["dotenv/config"],
  testEnvironment: "node",
  moduleFileExtensions: ["ts", "tsx", "js"],
  testMatch: ['**/__tests__/**/*.test.ts'], 
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
};
