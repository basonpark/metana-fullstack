// configuration file is used to set up Jest specifically for Selenium-based browser testing

export default {
    testEnvironment: 'node',
    transform: {
      '^.+\\.jsx?$': 'babel-jest',
    },
    testMatch: ['**/__tests__/integration/**/*.test.js'],
    setupFilesAfterEnv: ['<rootDir>/jest.setup.selenium.js'],
    collectCoverage: true,
    coverageDirectory: 'coverage/selenium',
    coverageReporters: ['json', 'lcov', 'text', 'clover'],
  };