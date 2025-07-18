export default {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testTimeout: 100_000_000,
    transform: {
        '^.+\\.ts$': ['ts-jest', { isolatedModules: true }],
        '^.+\\.js$': 'ts-jest'
    },
    transformIgnorePatterns: ['/node_modules/(?!(azle|cuzz)/)'] // Make sure azle and cuzz are transformed
};
