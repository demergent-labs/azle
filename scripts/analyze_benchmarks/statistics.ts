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

const MAX_VALID_INSTRUCTIONS = 40_000_000_000;
const EFFICIENCY_WEIGHTS = {
    min: 0.6,
    median: 0.3,
    mean: 0.1
} as const;

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
        (val) => val <= MAX_VALID_INSTRUCTIONS
    );

    if (filteredInstructions.length === 0) {
        throw new Error(
            'No valid instructions after filtering (all values > 40 billion)'
        );
    }

    const sorted = [...filteredInstructions].sort((a, b) => a - b);

    const count = filteredInstructions.length;
    const min = sorted[0];
    const median = calculateMedian(sorted);
    const mean = calculateMean(filteredInstructions);
    const standardDeviation = calculateStandardDeviation(filteredInstructions);
    const max = sorted[sorted.length - 1];
    const baselineWeightedEfficiencyScore =
        calculateBaselineWeightEfficiencyScore(min, median, mean);

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

function calculateMean(instructions: readonly number[]): number {
    return (
        instructions.reduce((acc, val) => acc + val, 0) / instructions.length
    );
}

function calculateMedian(sorted: readonly number[]): number {
    const mid = Math.floor(sorted.length / 2);
    return sorted.length % 2 === 0
        ? (sorted[mid - 1] + sorted[mid]) / 2
        : sorted[mid];
}

function calculateStandardDeviation(instructions: readonly number[]): number {
    const mean = calculateMean(instructions);
    return Math.sqrt(
        instructions
            .map((value) => Math.pow(value - mean, 2))
            .reduce((acc, val) => acc + val, 0) / instructions.length
    );
}

function calculateBaselineWeightEfficiencyScore(
    min: number,
    median: number,
    mean: number
): number {
    return (
        EFFICIENCY_WEIGHTS.min * min +
        EFFICIENCY_WEIGHTS.median * median +
        EFFICIENCY_WEIGHTS.mean * mean
    );
}
