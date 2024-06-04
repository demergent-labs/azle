/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    bail: true,
    preset: 'ts-jest',
    testEnvironment: 'node',
    testTimeout: 60_000,
    transform: {
        '^.+\\.ts$': 'ts-jest',
        '^.+\\.js$': 'ts-jest'
    }
};
