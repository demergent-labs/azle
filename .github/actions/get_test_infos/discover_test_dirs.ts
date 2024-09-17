import { readFile, readdir } from 'fs/promises';
import { join } from 'path';

// Recursively find directories and check for package.json with a test script
export async function discoverTestDirs(dirToSearch: string): Promise<string[]> {
    const files = await readdir(dirToSearch, { withFileTypes: true });

    return files.reduce(
        async (accPromise, file) => {
            const acc = await accPromise;

            const fullPath = join(dirToSearch, file.name);

            if (file.isDirectory() && !fullPath.includes('node_modules')) {
                // Check for package.json and if it contains a test script
                const packageJsonPath = join(fullPath, 'package.json');
                const hasTestScript = await checkForTestScript(packageJsonPath);

                // Recurse into subdirectory
                return [
                    ...acc,
                    ...(hasTestScript ? [fullPath] : []),
                    ...(await discoverTestDirs(fullPath))
                ];
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
        return (
            packageData.scripts !== undefined &&
            packageData.scripts.test !== undefined
        );
    } catch {
        // Return false if the file doesn't exist or there's a JSON error
        return false;
    }
}
