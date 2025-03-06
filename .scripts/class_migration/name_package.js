import * as fs from 'fs';
import * as path from 'path';

// Get the current directory name
const currentDirectory = path.basename(process.cwd());

// Define the new name for the package
const newName = `${currentDirectory}_end_to_end_test_functional_syntax`;

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

    // Check if express is listed as a dependency
    const hasExpressDependency =
        packageJson.dependencies && packageJson.dependencies.express;
    if (hasExpressDependency) {
        console.info(
            'Express is listed as a dependency. No changes will be made.'
        );
        return;
    }

    // Create a new object with the name field first
    const updatedPackageJson = {
        name: newName,
        ...packageJson
    };

    // Write the updated package.json back to the file
    fs.writeFile(
        packageJsonPath,
        JSON.stringify(updatedPackageJson, null, 2),
        'utf8',
        (writeErr) => {
            if (writeErr) {
                console.error(
                    `Error writing updated package.json: ${writeErr}`
                );
                return;
            }
            console.info(
                `package.json successfully updated with new name: ${newName}`
            );
        }
    );
});
