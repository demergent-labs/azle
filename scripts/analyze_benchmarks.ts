import { lstatSync, readdirSync, readFileSync, statSync } from 'fs';
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

function findBenchmarkFiles(dir: string): string[] {
    if (dir.includes('node_modules')) {
        return [];
    }

    function safeReadDir(directory: string): string[] {
        try {
            return readdirSync(directory);
        } catch (error: any) {
            console.warn(
                `Warning: Could not read directory ${directory}:`,
                error.message
            );
            return [];
        }
    }

    function processItem(item: string): string[] {
        const fullPath = join(dir, item);

        try {
            if (lstatSync(fullPath).isSymbolicLink()) {
                return [];
            }

            const stat = statSync(fullPath);
            if (stat.isDirectory()) {
                return findBenchmarkFiles(fullPath);
            }
            return item === 'benchmarks.json' ? [fullPath] : [];
        } catch (error: any) {
            console.warn(
                `Warning: Could not access ${fullPath}:`,
                error.message
            );
            return [];
        }
    }

    return safeReadDir(dir).flatMap(processItem);
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
    function calculateChange(prevValue: number, currValue: number): number {
        return ((prevValue - currValue) / prevValue) * 100;
    }

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

function analyzeAllBenchmarks(
    rootDir: string = '.'
): Record<string, Statistics> {
    function extractBenchmarkEntries(
        file: string
    ): Array<[string, BenchmarkEntry]> {
        const data: BenchmarksJson = JSON.parse(readFileSync(file, 'utf-8'));

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
                [version]: [...(acc[version] || []), entry]
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

    const benchmarkFiles = findBenchmarkFiles(rootDir);
    const versionEntries = benchmarkFiles.flatMap(extractBenchmarkEntries);
    const entriesByVersion = groupEntriesByVersion(versionEntries);
    const results = Object.entries(entriesByVersion).reduce(
        (acc, [version, entries]) => ({
            ...acc,
            [version]: calculateVersionStatistics(entries)
        }),
        {} as Record<string, Statistics>
    );

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

    return results;
}

// Run the analysis and output results
try {
    console.log('Analyzing benchmarks...');
    const results = analyzeAllBenchmarks();
    console.log(JSON.stringify(results, null, 2));
} catch (error) {
    console.error('Error analyzing benchmarks:', error);
}
