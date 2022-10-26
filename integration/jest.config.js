module.exports = {
    preset: 'jest-puppeteer',
    testRegex: '.*/\\.test\\.js$',
    setupFilesAfterEnv: ['./setupTests.js']
}

//"jest:integration": "jest -c integration/jest.config.js",
//"test:integration": "start-server-and-test storybook http-get://localhost:6006 jest:integration"