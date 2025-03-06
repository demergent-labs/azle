/* eslint-disable @typescript-eslint/explicit-function-return-type */
import * as fs from 'fs';
import * as path from 'path';

// Path to the tests.ts file
const testsFilePath = path.join(process.cwd(), 'test', 'tests.ts');

// Function to delete the file
const deleteFile = (filePath) => {
    fs.unlink(filePath, (err) => {
        if (err && err.code === 'ENOENT') {
            console.info(`File not found: ${filePath}`);
        } else if (err) {
            console.error(`Error deleting file ${filePath}: ${err}`);
        } else {
            console.info(`Successfully deleted file: ${filePath}`);
        }
    });
};

// Delete the tests.ts file
deleteFile(testsFilePath);
