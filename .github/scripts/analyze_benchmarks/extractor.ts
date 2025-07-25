import { readFile } from 'fs/promises';

export type BenchmarkEntry = {
    instructions: { __bigint__: string };
    method_name: string;
    timestamp: { __bigint__: string };
};

type VersionBenchmarks = {
    version: string;
    benchmarks: BenchmarkEntry[];
};

type CanisterBenchmark = {
    current: VersionBenchmarks;
    previous: VersionBenchmarks;
};

type BenchmarksJson = {
    [canisterName: string]: CanisterBenchmark;
};

/**
 * Extracts benchmark entries from multiple files and groups them by version
 * @param files Array of file paths to process
 * @returns A record mapping version strings to arrays of benchmark entries
 */
export async function extractBenchmarksEntriesFromFiles(
    files: string[]
): Promise<Record<string, BenchmarkEntry[]>> {
    const versionEntries = (
        await Promise.all(files.map(extractBenchmarkEntries))
    ).flat();

    return groupEntriesByVersion(versionEntries);
}

/**
 * Extracts benchmark entries from a single file
 * @param file Path to the benchmark file
 * @returns Array of tuples containing version and benchmark entry pairs
 */
async function extractBenchmarkEntries(
    file: string
): Promise<Array<[string, BenchmarkEntry]>> {
    const data: BenchmarksJson = JSON.parse(await readFile(file, 'utf-8'));

    return Object.values(data).flatMap((canisterData) => {
        const currentEntries = getBenchmarkEntries(canisterData.current);
        const previousEntries = getBenchmarkEntries(canisterData.previous);

        return [...currentEntries, ...previousEntries];
    });
}

/**
 * Extracts benchmark entries with their versions from a VersionBenchmarks object
 * @param versionBenchmarks Object containing version and its benchmark entries
 * @returns Array of tuples containing version and benchmark entry pairs
 */
function getBenchmarkEntries(
    versionBenchmarks: VersionBenchmarks
): [string, BenchmarkEntry][] {
    return versionBenchmarks.benchmarks.map((benchmark) => [
        versionBenchmarks.version,
        benchmark
    ]);
}

/**
 * Groups benchmark entries by their version
 * @param entries Array of version and benchmark entry pairs
 * @returns A record mapping version strings to arrays of benchmark entries
 */
function groupEntriesByVersion(
    entries: Array<[string, BenchmarkEntry]>
): Record<string, BenchmarkEntry[]> {
    return entries.reduce(
        (acc, [version, entry]) => ({
            ...acc,
            [version]: [...(acc[version] ?? []), entry]
        }),
        {} as Record<string, BenchmarkEntry[]>
    );
}
