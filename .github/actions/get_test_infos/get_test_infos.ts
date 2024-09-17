import { discoverTestDirs } from './discover_test_dirs.js';
import { dirToTestInfo, TestInfo } from './dir_to_test_info.js';

export async function getTestInfos(
    dirs: string[],
    excludeDirs: string[]
): Promise<TestInfo[]> {
    const allDirs = (
        await dirs.reduce(
            async (accPromise, dir) => {
                const acc = await accPromise;
                const discoveredDirs = await discoverTestDirs(dir);
                return [...acc, ...discoveredDirs];
            },
            Promise.resolve([] as string[])
        )
    )
        .filter((dir) => dir && !isExcluded(dir, excludeDirs))
        .sort();

    const testInfos = allDirs.map((dir) => dirToTestInfo(dir));

    return testInfos;
}

function isExcluded(dir: string, excludeDirs: string[]): boolean {
    return excludeDirs.some((exclude) => dir.includes(exclude));
}
