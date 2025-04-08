#!/usr/bin/env tsx

import { execSync } from 'child_process';
import { existsSync, statSync } from 'fs'; // Keep some sync methods for simplicity
import { readdir, rm } from 'fs/promises';
import * as path from 'path';
import { fileURLToPath } from 'url';

/**
 * Recursively searches for Node.js projects and runs 'npx azle clean' on them
 *
 * @param directory - The directory to search in
 */
async function cleanProjects(directory: string): Promise<void> {
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
                await rm('.dfx', {
                    recursive: true,
                    force: true
                });

                console.info(`./.dfx directory deleted`);

                await rm('node_modules', {
                    recursive: true,
                    force: true
                });

                console.info(`./node_modules directory deleted`);
                console.info(`Successfully cleaned project in ${directory}`);
            } catch (error) {
                console.error(
                    `Error cleaning project in ${directory}: ${error instanceof Error ? error.message : String(error)}`
                );
            }
        }

        // Read all entries in the current directory
        const entries = await readdir(directory);

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
}

async function main(): Promise<void> {
    // Get the starting directory from command line or use examples directory relative to script location
    const scriptPath = fileURLToPath(import.meta.url);
    const scriptDir = path.dirname(scriptPath);
    const startDirectory =
        process.argv[2] || path.join(scriptDir, '..', 'examples');

    console.info(
        `Starting to search for Node.js projects in: ${startDirectory}`
    );

    // Start the recursive search and cleaning
    await cleanProjects(startDirectory);
    console.info('Finished cleaning all Node.js projects.');
}

main();
