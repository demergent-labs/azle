// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

// Directories to be removed
const directoriesToRemove = ['node_modules', '.azle', '.dfx'];

// Function to remove a directory
const removeDirectory = (dirPath) => {
    if (fs.existsSync(dirPath)) {
        fs.rm(dirPath, { recursive: true, force: true }, (err) => {
            if (err) {
                console.error(`Error removing directory ${dirPath}: ${err}`);
            } else {
                console.log(`Successfully removed directory: ${dirPath}`);
            }
        });
    } else {
        console.log(`Directory not found: ${dirPath}`);
    }
};

// Remove specified directories
directoriesToRemove.forEach((dir) => {
    const fullPath = path.join(process.cwd(), dir);
    removeDirectory(fullPath);
});
