#!/bin/bash

# Check if package.json exists
if [ ! -f package.json ]; then
    echo "package.json not found!"
    exit 1
fi

# Update package.json to set "test" to "jest"
jq '.scripts.test = "jest"' package.json > tmp.json && mv tmp.json package.json

# Install jest and ts-jest
npm install --save-dev jest ts-jest
npm link azle

# Create jest.config.js with the specified contents
cat <<EOL > jest.config.js
/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    transform: {
        '^.+\\.ts$': ['ts-jest', { isolatedModules: true }],
        '^.+\\\\.js$': 'ts-jest'
    },
    transformIgnorePatterns: ['/node_modules/(?!(azle)/)'] // Make sure azle is transformed
};
EOL

echo "Setup complete!"
