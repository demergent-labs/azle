import * as fs from 'fs';
import * as path from 'path';

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

    // Remove devDependencies
    delete packageJson.devDependencies;

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
                'Successfully removed devDependencies from package.json'
            );
        }
    );
});
