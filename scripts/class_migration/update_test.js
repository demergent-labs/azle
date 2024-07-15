import * as fs from 'fs';
import * as path from 'path';

// Get the current directory name
const currentDirectory = path.basename(process.cwd());

// Path to the test.ts file
const testFilePath = path.join(process.cwd(), 'test', 'test.ts');

// Existing import statement to remove
const existingImportStatement = "import { getTests } from './tests';";

// New import statement to add
const newImportStatement = `import { getTests } from '${currentDirectory}_end_to_end_test_functional_syntax/test/tests';`;

// Read the test.ts file
fs.readFile(testFilePath, 'utf8', (err, data) => {
    if (err) {
        console.error(`Error reading test.ts file: ${err}`);
        return;
    }

    // Replace the existing import statement with the new one
    const modifiedContent = data.replace(
        existingImportStatement,
        newImportStatement
    );

    // Write the modified content back to the file
    fs.writeFile(testFilePath, modifiedContent, 'utf8', (writeErr) => {
        if (writeErr) {
            console.error(`Error writing modified test.ts file: ${writeErr}`);
            return;
        }

        console.info('test.ts successfully modified.');
    });
});
