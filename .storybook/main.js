module.exports = {
    "stories": [
        "../src/**/*.stories.mdx",
        "../src/**/*.stories.@(js|jsx|ts|tsx)"
    ],
    "addons": [
        "@storybook/addon-links",
        "@storybook/addon-essentials",
        "@storybook/addon-interactions",
        "@storybook/preset-create-react-app",
        {
            name: '@storybook/addon-storysource',
            options: {
                loaderOptions: {
                    injectStoryParameters: false,
                },
            },
        },
        // {
        //     name: '@storybook/addon-storysource',
        //     options: {
        //         rule: {
        //             // test: [/\.stories\.jsx?$/], This is default
        //              include: [path.resolve(__dirname, '../src')], // You can specify directories
        //         },
        //         loaderOptions: {
        //             prettierConfig: { printWidth: 80, singleQuote: false },
        //         },
        //     },
        // },
    ],
    "framework": "@storybook/react",
    "core": {
        "builder": "@storybook/builder-webpack5"
    }
}

// module.exports = {
//     "stories": [
//         "../src/**/*.stories.mdx",
//         "../src/**/*.stories.@(js|jsx|ts|tsx)"
//     ],
//     "addons": [
//         "@storybook/addon-links",
//         "@storybook/addon-essentials",
//         "@storybook/addon-interactions",
//         "@storybook/preset-create-react-app",
//         '@storybook/addon-interactions', // 👈 Addon is registered here
//     ],
//     features: {
//         interactionsDebugger: true, // 👈 Enable playback controls
//     },
//     "framework": "@storybook/react",
//     "core": {
//         "builder": "@storybook/builder-webpack5"
//     }
// }