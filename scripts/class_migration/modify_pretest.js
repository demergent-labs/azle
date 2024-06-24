// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

// Path to the pretest.ts file
const pretestFilePath = path.join(process.cwd(), 'test', 'pretest.ts');

const currentDirectory = path.basename(process.cwd());

// Lines to add at the top of the file
const importLines = [
    "import { linkAndInstallPatch } from 'azle/test/jest_link';",
    "import { join } from 'path';"
];

// Line to add after async function pretest() {
const additionalLine = `    linkAndInstallPatch(join('examples', '${currentDirectory}'));\n`;

// Read the pretest.ts file
fs.readFile(pretestFilePath, 'utf8', (err, data) => {
    if (err) {
        console.error(`Error reading pretest.ts file: ${err}`);
        return;
    }

    // Split the file content into lines
    const lines = data.split('\n');

    // Find the index where async function pretest() { is defined
    const pretestIndex = lines.findIndex((line) =>
        line.trim().startsWith('async function pretest() {')
    );
    if (pretestIndex === -1) {
        console.error('Async function pretest() not found in pretest.ts file.');
        return;
    }

    // Insert import lines at the beginning of the file
    lines.splice(0, 0, ...importLines);

    // Insert additional line after async function pretest() {
    lines.splice(pretestIndex + 3, 0, additionalLine);

    // Join the lines back into a single string
    const modifiedContent = lines.join('\n');

    // Write the modified content back to the file
    fs.writeFile(pretestFilePath, modifiedContent, 'utf8', (writeErr) => {
        if (writeErr) {
            console.error(
                `Error writing modified pretest.ts file: ${writeErr}`
            );
            return;
        } else {
            console.log('pretest.ts successfully modified.');
        }
    });
});
