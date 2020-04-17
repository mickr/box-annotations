module.exports = api => {
    api.cache(() => process.env.NODE_ENV);

    return {
        presets: [
            [
                '@babel/preset-env',
                {
                    modules: false,
                },
            ],
            '@babel/preset-react',
            '@babel/preset-flow',
        ],
        plugins: [
            '@babel/plugin-proposal-class-properties',
            '@babel/plugin-proposal-object-rest-spread',
            '@babel/plugin-transform-flow-strip-types',
            '@babel/plugin-transform-object-assign',
            [
                'react-intl',
                {
                    messagesDir: './i18n/json',
                },
            ],
        ],
        overrides: [
            {
                test: ['./src/**/*.ts', './src/**/*.tsx'],
                presets: [
                    [
                        '@babel/preset-typescript',
                        {
                            isTSX: true,
                            allExtensions: true,
                        },
                    ],
                ],
            },
        ],
        env: {
            test: {
                plugins: ['@babel/plugin-transform-modules-commonjs'],
            },
        },
    };
};
