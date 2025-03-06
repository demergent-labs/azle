/* eslint-disable @typescript-eslint/explicit-function-return-type */
import * as fs from 'fs';
import * as path from 'path';

// Helper function to copy a file from src to dest
const copyFile = (src, dest) => {
    fs.copyFile(src, dest, (err) => {
        if (err) {
            console.error(`Error copying file from ${src} to ${dest}: ${err}`);
        } else {
            console.info(`File copied from ${src} to ${dest}`);
        }
    });
};

// Path to the dfx.json file
const dfxJsonPath = path.join(process.cwd(), 'dfx.json');
// Path to the package.json file
const packageJsonPath = path.join(process.cwd(), 'package.json');

// Read and parse package.json to find the devDependency path
fs.readFile(packageJsonPath, 'utf8', (err, packageData) => {
    if (err) {
        console.error(`Error reading package.json file: ${err}`);
        return;
    }

    let packageJson;
    try {
        packageJson = JSON.parse(packageData);
    } catch (parseErr) {
        console.error(`Error parsing package.json: ${parseErr}`);
        return;
    }

    // Get the current directory name
    const currentDirectory = path.basename(process.cwd());
    const devDependencyKey = `${currentDirectory}_end_to_end_test_functional_syntax`;
    const devDependencyPath = packageJson.devDependencies[devDependencyKey];

    if (!devDependencyPath || !devDependencyPath.startsWith('file:')) {
        console.error(
            `DevDependency ${devDependencyKey} not found or invalid in package.json.`
        );
        return;
    }

    const basePath = devDependencyPath.replace('file:', '');

    // Read and parse dfx.json to get canisters and their candid paths
    fs.readFile(dfxJsonPath, 'utf8', (err, dfxData) => {
        if (err) {
            console.error(`Error reading dfx.json file: ${err}`);
            return;
        }

        let dfxJson;
        try {
            dfxJson = JSON.parse(dfxData);
        } catch (parseErr) {
            console.error(`Error parsing dfx.json: ${parseErr}`);
            return;
        }

        const canisters = dfxJson.canisters;
        if (canisters && typeof canisters === 'object') {
            Object.keys(canisters).forEach((canisterName) => {
                const canister = canisters[canisterName];
                if (canister.candid) {
                    const sourcePath = path.join(
                        basePath,
                        '.azle',
                        canisterName,
                        'canister',
                        'src',
                        'candid.did'
                    );
                    const destPath = path.join(process.cwd(), canister.candid);
                    copyFile(sourcePath, destPath);
                } else {
                    console.error(
                        `Candid field is missing in canister: ${canisterName}`
                    );
                }
            });
        } else {
            console.error('Canisters field is missing or invalid in dfx.json.');
        }
    });
});
