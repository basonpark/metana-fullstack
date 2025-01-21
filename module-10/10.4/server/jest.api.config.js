// configuration file is used to set up Jest specifically for API testing with Supertest

export default {
    testEnvironment: 'node',
    transform: {
      '^.+\\.jsx?$': 'babel-jest',
    },
    testMatch: ['**/__tests__/*.test.js'],
    collectCoverage: true,
    coverageDirectory: 'coverage/api',
    coverageReporters: ['json', 'lcov', 'text', 'clover'],
  };