module.exports = {
  roots: ['<rootDir>/app'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testTimeout: 30000,
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  coverageReporters: ['json', 'lcov', 'text', 'clover'],
};
