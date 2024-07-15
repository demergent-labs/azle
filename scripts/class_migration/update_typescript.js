import { exec } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

const tsVersion = '^5.2.2';

// Path to the package.json file
const packageJsonPath = path.join(process.cwd(), 'package.json');

// Check if node_modules directory exists
const nodeModulesPath = path.join(process.cwd(), 'node_modules');
const nodeModulesExists = fs.existsSync(nodeModulesPath);

const doInstall = false;

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

    // Update the TypeScript version in dependencies or devDependencies
    if (packageJson.dependencies && packageJson.dependencies.typescript) {
        packageJson.dependencies.typescript = tsVersion;
    } else if (
        packageJson.devDependencies &&
        packageJson.devDependencies.typescript
    ) {
        packageJson.devDependencies.typescript = tsVersion;
    } else {
        console.error(
            'TypeScript is not listed as a dependency in package.json.'
        );
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

            console.info(
                `package.json successfully updated with TypeScript version: ${tsVersion}`
            );

            // Run npm install
            if (doInstall) {
                exec('npm install', (installErr, stdout) => {
                    if (installErr) {
                        console.error(
                            `Error running npm install: ${installErr}`
                        );
                        return;
                    }

                    console.info('npm install completed successfully');
                    console.info(stdout);

                    // Delete node_modules if it did not exist before
                    if (!nodeModulesExists) {
                        fs.rm(
                            nodeModulesPath,
                            { recursive: true, force: true },
                            (rmErr) => {
                                if (rmErr) {
                                    console.error(
                                        `Error removing node_modules directory: ${rmErr}`
                                    );
                                } else {
                                    console.info(
                                        'node_modules directory removed as it did not exist before running the script.'
                                    );
                                }
                            }
                        );
                    }
                });
            }
        }
    );
});
