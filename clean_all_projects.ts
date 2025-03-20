#!/usr/bin/env tsx

import { execSync } from 'child_process';
import { existsSync, statSync } from 'fs'; // Keep some sync methods for simplicity
import * as fs from 'fs/promises';
import * as path from 'path';

/**
 * Recursively searches for Node.js projects and runs 'npx azle clean' on them
 *
 * @param directory - The directory to search in
 */
const cleanProjects = async (directory: string): Promise<void> => {
    try {
        // Check if this directory is a Node.js project
        const isNodeProject = existsSync(path.join(directory, 'package.json'));

        // If it's a Node.js project, run the clean command
        if (isNodeProject) {
            console.info(`Found Node.js project in: ${directory}`);
            try {
                console.info(`Running 'npx azle clean' in ${directory}...`);
                execSync('npx azle clean', {
                    cwd: directory,
                    stdio: 'inherit' // Show output in console
                });
                console.info(`Successfully cleaned project in ${directory}`);
            } catch (error) {
                console.error(
                    `Error cleaning project in ${directory}: ${error instanceof Error ? error.message : String(error)}`
                );
            }
        }

        // Read all entries in the current directory
        const entries = await fs.readdir(directory);

        // Process subdirectories
        for (const entry of entries) {
            // Skip node_modules directories
            if (entry === 'node_modules') {
                continue;
            }

            const fullPath = path.join(directory, entry);

            // Check if this is a directory
            const stats = statSync(fullPath); // Using sync for simplicity in the loop
            if (stats.isDirectory()) {
                // Recursively process this subdirectory
                await cleanProjects(fullPath);
            }
        }
    } catch (error) {
        console.error(
            `Error processing directory ${directory}: ${error instanceof Error ? error.message : String(error)}`
        );
    }
};

// Get the starting directory from command line or use current directory
const startDirectory = process.argv[2] || process.cwd();
console.info(`Starting to search for Node.js projects in: ${startDirectory}`);

// Start the recursive search and cleaning
cleanProjects(startDirectory)
    .then(() => console.info('Finished cleaning all Node.js projects.'))
    .catch((error: unknown) =>
        console.error(
            `Error in main execution: ${error instanceof Error ? error.message : String(error)}`
        )
    );
