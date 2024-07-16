/* eslint-disable @typescript-eslint/explicit-function-return-type */

import * as fs from 'fs';
import * as path from 'path';

// Path to the package.json file
const packageJsonPath = path.join(process.cwd(), 'package.json');

// Helper function to sort an object by its keys
const sortObjectByKeys = (obj) => {
    return Object.keys(obj)
        .sort()
        .reduce((result, key) => {
            result[key] = obj[key];
            return result;
        }, {});
};

// Read and parse package.json
fs.readFile(packageJsonPath, 'utf8', (err, data) => {
    if (err) {
        console.error(`Error reading package.json file: ${err}`);
        return;
    }

    let packageJson;
    try {
        packageJson = JSON.parse(data);
    } catch (parseErr) {
        console.error(`Error parsing package.json: ${parseErr}`);
        return;
    }

    const tsxVersion = '^4.15.7';
    let tsNodeRemoved = false;

    // Check and update dependencies
    if (packageJson.dependencies && packageJson.dependencies['ts-node']) {
        delete packageJson.dependencies['ts-node'];
        packageJson.dependencies['tsx'] = tsxVersion;
        packageJson.dependencies = sortObjectByKeys(packageJson.dependencies);
        tsNodeRemoved = true;
    }

    // Check and update devDependencies
    if (packageJson.devDependencies && packageJson.devDependencies['ts-node']) {
        delete packageJson.devDependencies['ts-node'];
        packageJson.devDependencies['tsx'] = tsxVersion;
        packageJson.devDependencies = sortObjectByKeys(
            packageJson.devDependencies
        );
        tsNodeRemoved = true;
    }

    if (!tsNodeRemoved) {
        console.info('ts-node not found in dependencies or devDependencies.');
        return;
    }

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

            console.info('package.json successfully updated.');
        }
    );
});
