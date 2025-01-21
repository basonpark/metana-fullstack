// general configuration file for Jest, applicable to the entire project

module.exports = {
    transform: {
      '^.+\\.(js|mjs)$': 'babel-jest',
    },
    testMatch: ['**/__tests__/*.test.js'],
  };