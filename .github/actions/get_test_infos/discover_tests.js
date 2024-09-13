import { promises as fs } from 'fs';
import path from 'path';

// Discover directories containing a package.json file with a test script
export async function discoverTests(dir) {
    const directories = [];
    await findDirectories(dir, directories);
    return directories;
}

// Recursively find directories and check for package.json with a test script
async function findDirectories(currentDir, directories) {
    const files = await fs.readdir(currentDir, { withFileTypes: true });

    for (const file of files) {
        const fullPath = path.join(currentDir, file.name);

        if (file.isDirectory() && !fullPath.includes('node_modules')) {
            // Check for package.json and if it contains a test script
            const packageJsonPath = path.join(fullPath, 'package.json');
            const hasTestScript = await checkForTestScript(packageJsonPath);

            if (hasTestScript) {
                directories.push(fullPath);
            }

            // Recurse into subdirectory
            await findDirectories(fullPath, directories);
        }
    }
}

// Check if package.json contains a test script
async function checkForTestScript(packageJsonPath) {
    try {
        const packageJson = await fs.readFile(packageJsonPath, 'utf-8');
        const packageData = JSON.parse(packageJson);
        return packageData.scripts && packageData.scripts.test;
    } catch (err) {
        // Return false if the file doesn't exist or there's a JSON error
        return false;
    }
}
