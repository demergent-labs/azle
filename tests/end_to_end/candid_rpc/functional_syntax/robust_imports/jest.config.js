/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    transform: {
        '^.+\\.ts$': ['ts-jest', { isolatedModules: true }],
        '^.+\\.js$': 'ts-jest'
    },
    transformIgnorePatterns: ['/node_modules/(?!(azle)/)'] // Make sure azle is transformed
};
