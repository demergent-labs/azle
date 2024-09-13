import { discoverTestDirs } from './discover_test_dirs.js';
import { dirToTestInfo } from './dir_to_test_info.js';

export async function getTestInfos(dirs, excludeDirs) {
    const allDirs = await dirs.reduce(async (accPromise, dir) => {
        const acc = await accPromise;
        const discoveredDirs = await discoverTestDirs(dir);
        return [...acc, ...discoveredDirs];
    }, Promise.resolve([]));

    const testDirs = [...new Set(allDirs)] // Remove duplicates if any
        .sort()
        .filter((dir) => dir && !isExcluded(dir, excludeDirs));

    const testInfos = testDirs.map((dir) => dirToTestInfo(dir));

    return testInfos;
}

function isExcluded(dir, excludeDirs) {
    return excludeDirs.some((exclude) => dir.includes(exclude));
}
