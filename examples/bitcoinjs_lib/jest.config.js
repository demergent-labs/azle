/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testTimeout: 10_000,
    transform: {
        '^.+\\.ts$': 'ts-jest',
        '^.+\\.js$': 'ts-jest'
    }
};
