import { discoverTests } from './discover_tests.js';
import { generateTestInfos } from './generate_test_infos.js';

export async function processDirs(dirs, excludeDirs) {
    // Use reduce to accumulate all discovered directories
    const allDirs = await dirs.reduce(async (accPromise, dir) => {
        const acc = await accPromise;
        const discoveredDirs = await discoverTests(dir);
        return [...acc, ...discoveredDirs];
    }, Promise.resolve([]));

    // Sort the directories and remove duplicates
    const sortedDirs = [...new Set(allDirs)] // Remove duplicates if any
        .sort();

    // Call the generateJson function directly with sorted directories and excluded directories
    const testInfos = await generateTestInfos(sortedDirs, excludeDirs);

    // Log the result (or do further processing)
    return testInfos;
}
