/* eslint-disable @typescript-eslint/explicit-function-return-type */
import * as fs from 'fs';
import * as path from 'path';

// Directories to be removed
const directoriesToRemove = ['node_modules', '.azle', '.dfx'];

// Function to remove a directory
const removeDirectory = (dirPath) => {
    if (fs.existsSync(dirPath)) {
        fs.rm(dirPath, { recursive: true, force: true }, (err) => {
            if (err) {
                console.error(`Error removing directory ${dirPath}: ${err}`);
            } else {
                console.info(`Successfully removed directory: ${dirPath}`);
            }
        });
    } else {
        console.info(`Directory not found: ${dirPath}`);
    }
};

// Remove specified directories
directoriesToRemove.forEach((dir) => {
    const fullPath = path.join(process.cwd(), dir);
    removeDirectory(fullPath);
});
