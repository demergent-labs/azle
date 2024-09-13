import { discoverTestDirs } from './discover_test_dirs.js';
import { dirToTestInfo } from './dir_to_test_info.js';

export async function getTestInfos(dirs, excludeDirs) {
    const allDirs = await dirs.reduce(async (accPromise, dir) => {
        const acc = await accPromise;
        const discoveredDirs = await discoverTestDirs(dir);
        return [...acc, ...discoveredDirs];
    }, Promise.resolve([]));

    console.error(`These are all the dirs we found`);
    console.error(JSON.stringify(allDirs));
    console.error(`These are all of the dirs we are excluding`);
    console.error(excludeDirs);
    const testDirs = [...new Set(allDirs)] // Remove duplicates if any
        .sort()
        .filter((dir) => dir && !isExcluded(dir, excludeDirs));
    console.error(`These are all of the dirs after we have filtered`);
    console.error(testDirs);

    const testInfos = testDirs.map((dir) => dirToTestInfo(dir));

    return testInfos;
}

function isExcluded(dir, excludeDirs) {
    if (dir.includes('bitcoin')) {
        console.error('This is a bitcoin dir');
        console.error(dir);
        console.error('odds are it should be excluded');
        console.error(excludeDirs.some((exclude) => dir.includes(exclude)));
    }
    return excludeDirs.some((exclude) => dir.includes(exclude));
}
