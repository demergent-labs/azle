import { BenchmarkEntry } from './extractor';

export type Statistics = {
    count: number;
    mean: number;
    median: number;
    standardDeviation: number;
    min: number;
    max: number;
    baselineWeightedEfficiencyScore: number;
};

export function calculateVersionStatistics(
    entries: BenchmarkEntry[]
): [Statistics, Statistics] {
    const instructions = entries.map((entry) =>
        Number(entry.instructions.__bigint__)
    );

    // Calculate raw statistics
    const rawStats = calculateStatistics(instructions);

    // Calculate 75th percentile
    const sorted = [...instructions].sort((a, b) => a - b);
    const p75Index = sorted.length * 0.95;

    // Use slice to get values >= 75th percentile
    const filteredInstructions = sorted.slice(0, p75Index);

    // Calculate filtered statistics
    const filteredStats = calculateStatistics(filteredInstructions);

    return [rawStats, filteredStats];
}

function calculateStatistics(instructions: readonly number[]): Statistics {
    if (instructions.length === 0) {
        throw new Error('Cannot calculate statistics for empty array');
    }

    // Filter out instructions > 40 billion
    const filteredInstructions = instructions.filter(
        (val) => val <= 40_000_000_000
    );

    if (filteredInstructions.length === 0) {
        throw new Error(
            'No valid instructions after filtering (all values > 40 billion)'
        );
    }

    const sorted = [...filteredInstructions].sort((a, b) => a - b);
    const mean =
        filteredInstructions.reduce((acc, val) => acc + val, 0) /
        filteredInstructions.length;
    const mid = Math.floor(sorted.length / 2);

    const median =
        sorted.length % 2 === 0
            ? (sorted[mid - 1] + sorted[mid]) / 2
            : sorted[mid];

    const standardDeviation = Math.sqrt(
        filteredInstructions
            .map((value) => Math.pow(value - mean, 2))
            .reduce((acc, val) => acc + val, 0) / filteredInstructions.length
    );

    return {
        count: filteredInstructions.length,
        mean,
        median,
        standardDeviation,
        min: sorted[0],
        max: sorted[sorted.length - 1],
        baselineWeightedEfficiencyScore:
            calculateBaselineWeightEfficiencyScores({
                count: filteredInstructions.length,
                mean,
                median,
                standardDeviation,
                min: sorted[0],
                max: sorted[sorted.length - 1],
                baselineWeightedEfficiencyScore: 0
            })
    };
}

function calculateBaselineWeightEfficiencyScores(
    stats: Readonly<Statistics>
): number {
    const weights = {
        min: 0.6,
        median: 0.3,
        mean: 0.1
    } as const;

    return (
        weights.min * stats.min +
        weights.median * stats.median +
        weights.mean * stats.mean
    );
}
