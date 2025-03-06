import * as fs from 'fs';
import * as path from 'path';

// Get the current directory name
const currentDirectory = path.basename(process.cwd());

// Define the new dev dependency
const newDependencyName = `${currentDirectory}_end_to_end_test_functional_syntax`;
const newDependencyPath = `file:../../functional_syntax/${currentDirectory}`;

// Path to the package.json file
const packageJsonPath = path.join(process.cwd(), 'package.json');

// Read the package.json file
fs.readFile(packageJsonPath, 'utf8', (err, data) => {
    if (err) {
        console.error(`Error reading package.json file: ${err}`);
        return;
    }

    // Parse the package.json content
    let packageJson;
    try {
        packageJson = JSON.parse(data);
    } catch (parseErr) {
        console.error(`Error parsing package.json: ${parseErr}`);
        return;
    }

    // Ensure devDependencies exists
    packageJson.devDependencies = packageJson.devDependencies || {};

    // Add the new dev dependency
    packageJson.devDependencies[newDependencyName] = newDependencyPath;

    // Write the updated package.json back to the file
    fs.writeFile(
        packageJsonPath,
        JSON.stringify(packageJson, null, 2),
        'utf8',
        (writeErr) => {
            if (writeErr) {
                console.error(
                    `Error writing updated package.json: ${writeErr}`
                );
                return;
            }

            console.info(
                `package.json successfully updated with new dev dependency: ${newDependencyName}`
            );
        }
    );
});
