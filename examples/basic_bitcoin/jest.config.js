/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    bail: true,
    preset: 'ts-jest',
    testEnvironment: 'node',
    transform: {
        '^.+\\.ts$': 'ts-jest',
        '^.+\\.js$': 'ts-jest'
    }
};
