import * as fs from 'fs';
import * as path from 'path';

// Define the standard dev dependencies we want to add
const standardDevDependencies = {
    async_await_end_to_end_test_functional_syntax:
        'file:../../functional_syntax/async_await'
};

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

    // Add the standard devDependencies
    packageJson.devDependencies = {
        ...packageJson.devDependencies,
        ...standardDevDependencies
    };

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
                'Successfully added standard devDependencies to package.json'
            );
        }
    );
});
