import { discoverTestDirs } from './discover_test_dirs.js';
import { dirToTestInfo } from './dir_to_test_info.js';

export async function getTestInfos(dirs, excludeDirs) {
    // Use reduce to accumulate all discovered directories
    const allDirs = await dirs.reduce(async (accPromise, dir) => {
        const acc = await accPromise;
        const discoveredDirs = await discoverTestDirs(dir);
        return [...acc, ...discoveredDirs];
    }, Promise.resolve([]));

    // Sort the directories and remove duplicates
    const testDirs = [...new Set(allDirs)] // Remove duplicates if any
        .sort()
        .filter((dir) => dir && !isExcluded(dir, excludeDirs));

    const testInfos = testDirs.map((dir) => dirToTestInfo(dir));

    // Log the result (or do further processing)
    return testInfos;
}

// Function to check if a directory is excluded
function isExcluded(dir, excludeDirs) {
    return excludeDirs.some((exclude) => dir.includes(exclude));
}
