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
): Statistics {
    const instructions = entries.map((entry) =>
        Number(entry.instructions.__bigint__)
    );

    return calculateStatistics(instructions);
}

function calculateStatistics(instructions: number[]): Statistics {
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

    const count = filteredInstructions.length;
    const min = sorted[0];
    const max = sorted[sorted.length - 1];
    const baselineWeightedEfficiencyScore =
        calculateBaselineWeightEfficiencyScores(min, median, mean);

    return {
        count,
        mean,
        median,
        standardDeviation,
        min,
        max,
        baselineWeightedEfficiencyScore
    };
}

function calculateBaselineWeightEfficiencyScores(
    min: number,
    median: number,
    mean: number
): number {
    const weights = {
        min: 0.6,
        median: 0.3,
        mean: 0.1
    } as const;

    return weights.min * min + weights.median * median + weights.mean * mean;
}
