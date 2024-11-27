import { readdir, readFile, stat } from 'fs/promises';
import { join } from 'path';

type BenchmarkEntry = {
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

type Statistics = {
    count: number;
    mean: number;
    median: number;
    standardDeviation: number;
    min: number;
    baselineWeightedEfficiencyScore: number;
};

async function processDirectoryItem(
    dir: string,
    item: string
): Promise<string[]> {
    const fullPath = join(dir, item);

    const statInfo = await stat(fullPath);
    if (statInfo.isDirectory()) {
        return findBenchmarkFiles(fullPath);
    }
    return item === 'benchmarks.json' ? [fullPath] : [];
}

async function findBenchmarkFiles(dir: string): Promise<string[]> {
    if (dir.includes('node_modules')) {
        return [];
    }
    const items = await readdir(dir);
    const itemResults = await Promise.all(
        items.map((item) => processDirectoryItem(dir, item))
    );
    return itemResults.flat();
}

function calculateChange(prevValue: number, currValue: number): number {
    return ((prevValue - currValue) / prevValue) * 100;
}

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

function calculateVersionStatistics(entries: BenchmarkEntry[]): Statistics {
    const baseStats = calculateStatistics(
        entries.map((entry) => Number(entry.instructions.__bigint__))
    );
    return {
        ...baseStats,
        baselineWeightedEfficiencyScore:
            calculateBaselineWeightEfficiencyScores(baseStats)
    };
}

function calculateStatistics(instructions: readonly number[]): Statistics {
    if (instructions.length === 0) {
        throw new Error('Cannot calculate statistics for empty array');
    }

    const sorted = [...instructions].sort((a, b) => a - b);
    const mean =
        instructions.reduce((acc, val) => acc + val, 0) / instructions.length;
    const mid = Math.floor(sorted.length / 2);

    const median =
        sorted.length % 2 === 0
            ? (sorted[mid - 1] + sorted[mid]) / 2
            : sorted[mid];

    const standardDeviation = Math.sqrt(
        instructions
            .map((value) => Math.pow(value - mean, 2))
            .reduce((acc, val) => acc + val, 0) / instructions.length
    );

    return {
        count: instructions.length,
        mean,
        median,
        standardDeviation,
        min: sorted[0],
        baselineWeightedEfficiencyScore: 0
    };
}

function calculateBaselineWeightEfficiencyScores(
    stats: Readonly<Statistics>
): number {
    const weights = {
        min: 0.7,
        median: 0.3,
        mean: 0.0
    } as const;

    return (
        weights.min * stats.min +
        weights.median * stats.median +
        weights.mean * stats.mean
    );
}

function calculateVersionChanges(
    previous: Statistics,
    current: Statistics
): Record<string, number> {
    return {
        baselineWeightedEfficiencyScoreChange: calculateChange(
            previous.baselineWeightedEfficiencyScore,
            current.baselineWeightedEfficiencyScore
        ),
        averageScoreChange: calculateChange(previous.mean, current.mean),
        medianScoreChange: calculateChange(previous.median, current.median),
        minScoreChange: calculateChange(previous.min, current.min)
    };
}

async function analyzeAllBenchmarks(
    rootDir: string = '.'
): Promise<Record<string, Statistics>> {
    const benchmarkFiles = await findBenchmarkFiles(rootDir);
    const versionEntriesArrays = await Promise.all(
        benchmarkFiles.map(extractBenchmarkEntries)
    );
    const versionEntries = versionEntriesArrays.flat();

    const entriesByVersion = groupEntriesByVersion(versionEntries);

    return Object.entries(entriesByVersion).reduce(
        (acc, [version, entries]) => ({
            ...acc,
            [version]: calculateVersionStatistics(entries)
        }),
        {} as Record<string, Statistics>
    );
}

function compareChanges(results: Record<string, Statistics>): void {
    // Log comparison between versions
    const versions = Object.keys(results).sort();
    if (versions.length >= 2) {
        const [previous, current] = versions.slice(-2);
        const changes = calculateVersionChanges(
            results[previous],
            results[current]
        );

        console.log('\nPerformance changes from', previous, 'to', current);
        Object.entries(changes).forEach(([key, value]) => {
            console.log(`${key}:`, `${value.toFixed(2)}%`);
        });
    }
}

function main(): void {
    console.log('Analyzing benchmarks...');
    analyzeAllBenchmarks().then((results) => {
        compareChanges(results);
        console.log(JSON.stringify(results, null, 2));
    });
}

main();
