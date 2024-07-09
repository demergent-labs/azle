/* eslint-disable @typescript-eslint/explicit-function-return-type */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

// Path to the tests.ts file
const testsFilePath = path.join(process.cwd(), 'test', 'tests.ts');

// Function to delete the file
const deleteFile = (filePath) => {
    fs.unlink(filePath, (err) => {
        if (err && err.code === 'ENOENT') {
            console.log(`File not found: ${filePath}`);
        } else if (err) {
            console.error(`Error deleting file ${filePath}: ${err}`);
        } else {
            console.log(`Successfully deleted file: ${filePath}`);
        }
    });
};

// Delete the tests.ts file
deleteFile(testsFilePath);
