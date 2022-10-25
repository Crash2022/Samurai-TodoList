module.exports = {
    preset: 'jest-puppeteer',
    testRegex: '.*/\\.test\\.js$',
    setupFilesAfterEnv: ['./setupTests.js']
}

// module.exports = {
//     stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
//     addons: [
//         // Other Storybook addons
//         '@storybook/addon-interactions', // 👈 Addon is registered here
//     ],
//     features: {
//         interactionsDebugger: true, // 👈 Enable playback controls
//     },
// };


//"jest:integration": "jest -c integration/jest.config.js",
//"test:integration": "start-server-and-test storybook http-get://localhost:6006 jest:integration"