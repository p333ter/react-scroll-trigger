module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  testPathIgnorePatterns: ['/node_modules/', '/example/'],
  modulePathIgnorePatterns: ['/example/'],
  moduleDirectories: ['node_modules'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.test.{ts,tsx}',
    '!src/setupTests.ts',
  ],
  coverageReporters: ['json', 'lcov', 'text', 'clover'],
  testEnvironmentOptions: {
    url: 'http://localhost',
  },
};
