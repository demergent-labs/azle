/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    bail: true,
    testTimeout: 100_000_000,
    transform: {
        '^.+\\.ts$': ['ts-jest', { isolatedModules: true }],
        '^.+\\.js$': 'ts-jest'
    },
    transformIgnorePatterns: ['/node_modules/(?!(azle)/)'] // Make sure azle is transformed
};
