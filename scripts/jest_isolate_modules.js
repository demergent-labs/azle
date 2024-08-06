/* eslint-disable @typescript-eslint/explicit-function-return-type */

import * as fs from 'fs';
import * as path from 'path';

// Path to the jest.config.js file
const jestConfigPath = path.join(process.cwd(), 'jest.config.js');

// The new content for jest.config.js
const newJestConfigContent = `/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    transform: {
        '^.+\\\\.ts$': ['ts-jest', { isolatedModules: true }],
        '^.+\\\\.js$': 'ts-jest'
    },
    transformIgnorePatterns: ['/node_modules/(?!(azle)/)'] // Make sure azle is transformed
};
`;

// Overwrite the jest.config.js file with the new content
fs.writeFile(jestConfigPath, newJestConfigContent, 'utf8', (err) => {
    if (err) {
        console.error(`Error writing to jest.config.js: ${err}`);
        return;
    }

    console.info('jest.config.js successfully overwritten.');
});
