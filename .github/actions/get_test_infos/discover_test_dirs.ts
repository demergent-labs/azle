import { readdir, readFile } from 'fs/promises';
import { join } from 'path';

// Recursively find directories and check for package.json with a test script
export async function discoverTestDirs(dirToSearch: string): Promise<string[]> {
    // Check the root directory first
    const hasTestScript = await checkForTestScript(
        join(dirToSearch, 'package.json')
    );
    if (hasTestScript === true) {
        return [dirToSearch];
    }

    // If no test script found, check subdirectories
    const files = await readdir(dirToSearch, { withFileTypes: true });

    return files.reduce(
        async (accPromise, file) => {
            const acc = await accPromise;
            const fullPath = join(dirToSearch, file.name);

            if (file.isDirectory() && !fullPath.includes('node_modules')) {
                return [...acc, ...(await discoverTestDirs(fullPath))];
            }

            return acc;
        },
        Promise.resolve([] as string[])
    );
}

// Check if package.json exists and contains a test script
async function checkForTestScript(packageJsonPath: string): Promise<boolean> {
    try {
        const packageJson = await readFile(packageJsonPath, 'utf-8');
        const packageData = JSON.parse(packageJson);
        return packageData.scripts?.test !== undefined;
    } catch {
        // Return false if the file doesn't exist or there's a JSON error
        return false;
    }
}
