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
    weightedScore: number;
    percentileScore: number;
    normalizedScore: number;
    combinedScore: number;
};

function findBenchmarkFiles(dir: string): string[] {
    const files: string[] = [];

    try {
        // Skip node_modules directories
        if (dir.includes('node_modules')) {
            return files;
        }

        const items = readdirSync(dir);

        for (const item of items) {
            const fullPath = join(dir, item);

            try {
                // Skip if it's a symbolic link
                if (lstatSync(fullPath).isSymbolicLink()) {
                    continue;
                }

                const stat = statSync(fullPath);

                if (stat.isDirectory()) {
                    files.push(...findBenchmarkFiles(fullPath));
                } else if (item === 'benchmarks.json') {
                    files.push(fullPath);
                }
            } catch (error: any) {
                console.warn(
                    `Warning: Could not access ${fullPath}:`,
                    error.message
                );
                continue;
            }
        }
    } catch (error: any) {
        console.warn(
            `Warning: Could not read directory ${dir}:`,
            error.message
        );
    }

    return files;
}

function calculateStatistics(instructions: number[]): Statistics {
    if (instructions.length === 0) {
        throw new Error('Cannot calculate statistics for empty array');
    }

    // Sort numbers for median calculation
    const sorted = [...instructions].sort((a, b) => a - b);

    // Calculate mean
    const sum = instructions.reduce((acc, val) => acc + val, 0);
    const mean = sum / instructions.length;

    // Calculate median
    const mid = Math.floor(sorted.length / 2);
    const median =
        sorted.length % 2 === 0
            ? (sorted[mid - 1] + sorted[mid]) / 2
            : sorted[mid];

    // Calculate standard deviation
    const squareDiffs = instructions.map((value) => {
        const diff = value - mean;
        return diff * diff;
    });
    const standardDeviation = Math.sqrt(
        squareDiffs.reduce((acc, val) => acc + val, 0) / instructions.length
    );

    return {
        count: instructions.length,
        mean,
        median,
        standardDeviation,
        min: sorted[0],
        weightedScore: 0,
        percentileScore: 0,
        normalizedScore: 0,
        combinedScore: 0
    };
}

function calculateScores(stats: Statistics): {
    weightedScore: number;
    percentileScore: number;
    normalizedScore: number;
    combinedScore: number;
} {
    // Approach 1: Weighted Average Score
    // Penalizes both high mean and high variance
    const weightedScore =
        stats.mean * (1 + stats.standardDeviation / stats.mean);

    // Approach 2: Percentile-based Score
    // Focuses on typical performance, less affected by outliers
    const percentileScore = (stats.median * 2 + stats.mean) / 3;

    // Approach 3: Normalized Score
    // Balances central tendency and consistency
    const coefficientOfVariation = stats.standardDeviation / stats.mean;
    const normalizedScore = stats.median * (1 + coefficientOfVariation);

    const alpha = 0.3;
    // Validate alpha is between 0 and 1
    if (alpha < 0 || alpha > 1) {
        throw new Error('Alpha must be between 0 and 1');
    }

    // Calculate the combined score
    const { median, min } = stats;
    const combinedScore = alpha * median + (1 - alpha) * min;

    return {
        weightedScore,
        percentileScore,
        normalizedScore,
        combinedScore
    };
}

function analyzeAllBenchmarks(rootDir: string = '.'): {
    [version: string]: Statistics;
} {
    const benchmarkFiles = findBenchmarkFiles(rootDir);

    // Extract all benchmark entries grouped by version
    const versionEntries = benchmarkFiles.flatMap(
        (file): Array<[string, BenchmarkEntry]> => {
            const data: BenchmarksJson = JSON.parse(
                readFileSync(file, 'utf-8')
            );

            return Object.values(data).flatMap(
                (canisterData): Array<[string, BenchmarkEntry]> => {
                    const currentEntries = canisterData.current
                        ? canisterData.current.benchmarks.map(
                              (benchmark): [string, BenchmarkEntry] => [
                                  canisterData.current!.version,
                                  benchmark
                              ]
                          )
                        : [];

                    const previousEntries =
                        canisterData.previous.benchmarks.map(
                            (benchmark): [string, BenchmarkEntry] => [
                                canisterData.previous.version,
                                benchmark
                            ]
                        );

                    return [...currentEntries, ...previousEntries];
                }
            );
        }
    );

    // Group entries by version
    const entriesByVersion = versionEntries.reduce(
        (acc, [version, entry]) => ({
            ...acc,
            [version]: [...(acc[version] || []), entry]
        }),
        {} as { [version: string]: BenchmarkEntry[] }
    );

    // Transform version entries into statistics
    const results = Object.entries(entriesByVersion).reduce(
        (acc, [version, entries]) => {
            const baseStats = calculateStatistics(
                entries.map((entry) => Number(entry.instructions.__bigint__))
            );
            const scores = calculateScores(baseStats);
            return {
                ...acc,
                [version]: {
                    ...baseStats,
                    ...scores
                }
            };
        },
        {} as { [version: string]: Statistics }
    );

    // Add comparison between versions
    const versions = Object.keys(results).sort();
    if (versions.length >= 2) {
        const current = versions[versions.length - 1];
        const previous = versions[versions.length - 2];

        const changes = {
            weightedScoreChange:
                ((results[previous].weightedScore -
                    results[current].weightedScore) /
                    results[previous].weightedScore) *
                100,
            percentileScoreChange:
                ((results[previous].percentileScore -
                    results[current].percentileScore) /
                    results[previous].percentileScore) *
                100,
            normalizedScoreChange:
                ((results[previous].normalizedScore -
                    results[current].normalizedScore) /
                    results[previous].normalizedScore) *
                100,
            combinedScoreChange:
                ((results[previous].combinedScore -
                    results[current].combinedScore) /
                    results[previous].combinedScore) *
                100,
            averageScoreChange:
                ((results[previous].mean - results[current].mean) /
                    results[previous].mean) *
                100,
            medianScoreChange:
                ((results[previous].median - results[current].median) /
                    results[previous].median) *
                100,
            minScoreChange:
                ((results[previous].min - results[current].min) /
                    results[previous].min) *
                100
        };

        console.log('\nPerformance changes from', previous, 'to', current);
        console.log(
            'Weighted Score Change:',
            `${changes.weightedScoreChange.toFixed(2)}%`
        );
        console.log(
            'Percentile Score Change:',
            `${changes.percentileScoreChange.toFixed(2)}%`
        );
        console.log(
            'Normalized Score Change:',
            `${changes.normalizedScoreChange.toFixed(2)}%`
        );
        console.log(
            'Combined Score Change:',
            `${changes.combinedScoreChange.toFixed(2)}%`
        );
        console.log(
            'Average Score Change:',
            `${changes.averageScoreChange.toFixed(2)}%`
        );
        console.log(
            'Median Score Change:',
            `${changes.medianScoreChange.toFixed(2)}%`
        );
        console.log(
            'Min Score Change:',
            `${changes.minScoreChange.toFixed(2)}%`
        );
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
