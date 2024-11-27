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

export async function extractBenchmarkEntries(
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

export function groupEntriesByVersion(
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
