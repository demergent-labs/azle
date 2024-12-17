import { readFile } from 'fs/promises';

export type BenchmarkEntry = {
    instructions: { __bigint__: string };
    method_name: string;
    timestamp: { __bigint__: string };
};

type CanisterBenchmark = {
    current?: {
        version: string;
        benchmarks: BenchmarkEntry[];
    };
    previous: {
        version: string;
        benchmarks: BenchmarkEntry[];
    };
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
    const versionEntriesArrays = await Promise.all(
        files.map(extractBenchmarkEntries)
    );
    const versionEntries = versionEntriesArrays.flat();

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
        const currentEntries = canisterData.current
            ? canisterData.current.benchmarks.map(
                  (benchmark) =>
                      [canisterData.current!.version, benchmark] as [
                          string,
                          BenchmarkEntry
                      ]
              )
            : [];

        const previousEntries = canisterData.previous.benchmarks.map(
            (benchmark) =>
                [canisterData.previous.version, benchmark] as [
                    string,
                    BenchmarkEntry
                ]
        );

        return [...currentEntries, ...previousEntries];
    });
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
