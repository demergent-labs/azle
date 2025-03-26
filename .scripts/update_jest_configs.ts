#!/usr/bin/env tsx

import { existsSync } from 'fs';
import * as fs from 'fs/promises';
import * as path from 'path';
import { fileURLToPath } from 'url';

// Default Jest config in case no reference file is provided
const defaultJestConfig = `/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testTimeout: 100_000_000,
    transform: {
        '^.+\\.ts$': [
            'ts-jest',
            {
                isolatedModules: true,
                astTransformers: {
                    before: [{ path: 'ts-jest-mock-import-meta' }]
                }
            }
        ],
        '^.+\\.js$': 'ts-jest'
    },
    transformIgnorePatterns: ['/node_modules/(?!(azle)/)'] // Make sure azle is transformed
};
`;

/**
 * Reads the reference jest.config.js file
 * @param referenceFilePath - Path to the reference jest.config.js file
 * @returns The content of the reference file or the default config if the file doesn't exist
 */
const getReferenceConfig = async (
    referenceFilePath?: string
): Promise<string> => {
    if (referenceFilePath && existsSync(referenceFilePath)) {
        try {
            const content = await fs.readFile(referenceFilePath, 'utf8');
            console.info(`Using reference config from: ${referenceFilePath}`);
            return content;
        } catch (error) {
            console.error(
                `Error reading reference file: ${error instanceof Error ? error.message : String(error)}`
            );
            console.info('Falling back to default config');
        }
    } else if (referenceFilePath) {
        console.error(`Reference file not found: ${referenceFilePath}`);
        console.info('Falling back to default config');
    } else {
        console.info('No reference file provided, using default config');
    }

    return defaultJestConfig;
};

/**
 * Checks if the content of a jest.config.js file matches the expected config
 * @param filePath - Path to the jest.config.js file
 * @param referenceConfig - The reference configuration to compare against
 * @returns true if the content matches, false otherwise
 */
const checkJestConfig = async (
    filePath: string,
    referenceConfig: string
): Promise<boolean> => {
    try {
        const content = await fs.readFile(filePath, 'utf8');
        // Normalize content by removing whitespace and comments to ensure accurate comparison
        const normalizedContent = content
            .replace(/\/\/.*$/gm, '') // Remove single-line comments
            .replace(/\s+/g, ''); // Remove all whitespace

        const normalizedExpectedContent = referenceConfig
            .replace(/\/\/.*$/gm, '')
            .replace(/\s+/g, '');

        return normalizedContent === normalizedExpectedContent;
    } catch (error) {
        console.error(
            `Error reading jest.config.js at ${filePath}: ${error instanceof Error ? error.message : String(error)}`
        );
        return false;
    }
};

/**
 * Recursively searches for jest.config.js files and checks or updates them
 * @param directory - The directory to search in
 * @param referenceConfig - The reference configuration to use
 * @param checkOnly - If true, only check and report mismatched files without updating
 * @returns Object containing lists of matched, mismatched, and processed files
 */
const processJestConfigs = async (
    directory: string,
    referenceConfig: string,
    checkOnly: boolean
): Promise<{ matched: string[]; mismatched: string[]; processed: number }> => {
    const result = {
        matched: [] as string[],
        mismatched: [] as string[],
        processed: 0
    };

    try {
        // Check if this directory contains a jest.config.js file
        const jestConfigPath = path.join(directory, 'jest.config.js');
        const hasJestConfig = existsSync(jestConfigPath);

        // If it has a jest.config.js file, process it
        if (hasJestConfig) {
            result.processed++;

            if (checkOnly) {
                // Just check if the content matches
                const matches = await checkJestConfig(
                    jestConfigPath,
                    referenceConfig
                );
                if (matches) {
                    result.matched.push(jestConfigPath);
                } else {
                    result.mismatched.push(jestConfigPath);
                    console.info(
                        `Mismatched jest.config.js found in: ${directory}`
                    );
                }
            } else {
                // Update the file
                console.info(`Found jest.config.js in: ${directory}`);
                try {
                    await fs.writeFile(jestConfigPath, referenceConfig, 'utf8');
                    console.info(
                        `Successfully updated jest.config.js in ${directory}`
                    );
                    result.matched.push(jestConfigPath);
                } catch (error) {
                    console.error(
                        `Error updating jest.config.js in ${directory}: ${error instanceof Error ? error.message : String(error)}`
                    );
                    result.mismatched.push(jestConfigPath);
                }
            }
        }

        // Read all entries in the current directory
        const entries = await fs.readdir(directory);

        // Process subdirectories
        for (const entry of entries) {
            // Skip node_modules and .git directories
            if (entry === 'node_modules' || entry === '.git') {
                continue;
            }

            const fullPath = path.join(directory, entry);
            const stats = await fs.stat(fullPath);

            if (stats.isDirectory()) {
                // Recursively process this subdirectory
                const subResult = await processJestConfigs(
                    fullPath,
                    referenceConfig,
                    checkOnly
                );

                // Combine results
                result.matched = result.matched.concat(subResult.matched);
                result.mismatched = result.mismatched.concat(
                    subResult.mismatched
                );
                result.processed += subResult.processed;
            }
        }
    } catch (error) {
        console.error(
            `Error processing directory ${directory}: ${error instanceof Error ? error.message : String(error)}`
        );
    }

    return result;
};

async function main(): Promise<void> {
    // Parse command line arguments
    const args = process.argv.slice(2);
    const checkMode = args.includes('--check');

    // Find the reference file argument (--reference=path/to/jest.config.js)
    const referenceArg = args.find((arg) => arg.startsWith('--reference='));
    const referenceFilePath = referenceArg
        ? referenceArg.split('=')[1]
        : undefined;

    // Find the start directory argument (any argument not starting with --)
    const startDirectory =
        args.find((arg) => !arg.startsWith('--')) ||
        path.join(path.dirname(fileURLToPath(import.meta.url)), '..');

    // Get the reference configuration
    const referenceConfig = await getReferenceConfig(referenceFilePath);

    if (checkMode) {
        console.info(`Checking jest.config.js files in: ${startDirectory}`);
        const { matched, mismatched, processed } = await processJestConfigs(
            startDirectory,
            referenceConfig,
            true
        );

        console.info('\n--- Jest Config Check Summary ---');
        console.info(`Total jest.config.js files found: ${processed}`);
        console.info(`Files matching reference config: ${matched.length}`);
        console.info(
            `Files NOT matching reference config: ${mismatched.length}`
        );

        if (mismatched.length > 0) {
            console.info('\nMismatched files:');
            mismatched.forEach((file) => console.info(`- ${file}`));

            console.info('\nRun without --check to update these files.');
        }
    } else {
        console.info(
            `Starting to update jest.config.js files in: ${startDirectory}`
        );
        const { matched, mismatched, processed } = await processJestConfigs(
            startDirectory,
            referenceConfig,
            false
        );

        console.info('\n--- Jest Config Update Summary ---');
        console.info(`Total jest.config.js files found: ${processed}`);
        console.info(`Files successfully updated: ${matched.length}`);
        console.info(`Files with update errors: ${mismatched.length}`);

        if (mismatched.length > 0) {
            console.info('\nFiles with errors:');
            mismatched.forEach((file) => console.info(`- ${file}`));
        }
    }
}

main();
