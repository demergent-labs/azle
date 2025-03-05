/**
 * Script to find and list files with more than one line of actual content
 *
 * This script recursively searches a directory and outputs paths of all files
 * that contain more than one line of actual content, excluding trailing newlines.
 *
 * Usage:
 *   npx tsx scripts/find_multiline_files.ts <directory_path>
 *
 * @example
 *   npx tsx scripts/find_multiline_files.ts azle_exports
 */

import * as fs from 'fs';
import * as path from 'path';

/**
 * Recursively finds all files in a directory with more than one line of actual content.
 * Files with a single line of code followed by just a newline character are considered single-line files.
 * @param dirPath - The directory path to search
 * @returns An array of file paths with more than one line of actual content
 */
const findMultilineFiles = (dirPath: string): string[] => {
    const result: string[] = [];

    // Get all entries in the directory
    const entries = fs.readdirSync(dirPath, { withFileTypes: true });

    // Process each entry
    entries.forEach((entry) => {
        const fullPath = path.join(dirPath, entry.name);

        if (entry.isDirectory()) {
            // Recursively search subdirectories
            const subDirResults = findMultilineFiles(fullPath);
            result.push(...subDirResults);
        } else if (entry.isFile()) {
            try {
                // Read file content
                const content = fs.readFileSync(fullPath, 'utf-8');

                // Filter out empty lines and check if there's more than one line of actual content
                const nonEmptyLines = content
                    .split('\n')
                    .filter((line) => line.trim() !== '');

                if (nonEmptyLines.length > 1) {
                    result.push(fullPath);
                }
            } catch (error) {
                console.error(`Error reading file ${fullPath}:`, error);
            }
        }
    });

    return result;
};

/**
 * Main function that processes command line arguments and prints results
 * @returns void
 */
const main = (): void => {
    // Get directory path from command line arguments
    const args = process.argv.slice(2);

    if (args.length === 0) {
        console.error('Please provide a directory path as an argument');
        process.exit(1);
    }

    const dirPath = args[0];

    // Check if directory exists
    if (!fs.existsSync(dirPath) || !fs.statSync(dirPath).isDirectory()) {
        console.error(`"${dirPath}" is not a valid directory`);
        process.exit(1);
    }

    // Find and print multiline files
    console.log(
        `Finding files with more than one line of actual content in "${dirPath}"...\n`
    );
    const multilineFiles = findMultilineFiles(dirPath);

    if (multilineFiles.length === 0) {
        console.log(
            'No files with more than one line of actual content found.'
        );
    } else {
        console.log(
            `Found ${multilineFiles.length} files with more than one line of actual content:\n`
        );
        multilineFiles.forEach((filePath) => {
            console.log(filePath);
        });
    }
};

// Execute the main function
main();
