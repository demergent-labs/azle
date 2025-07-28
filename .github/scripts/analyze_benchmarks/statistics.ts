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
const BASELINE_EFFICIENCY_WEIGHTS = {
    min: 0.6,
    median: 0.3,
    mean: 0.1
};

/**
 * Calculates statistics for a set of benchmark entries
 * @param entries Array of benchmark entries to analyze
 * @returns Statistical analysis of the benchmark data
 */
export function calculateVersionStatistics(
    entries: BenchmarkEntry[]
): Statistics {
    const instructions = entries.map((entry) =>
        Number(entry.instructions.__bigint__)
    );

    return calculateStatistics(instructions);
}

/**
 * Calculates statistical measures for an array of instruction counts
 * @param instructions Array of instruction counts
 * @returns Statistical analysis including mean, median, standard deviation, etc.
 * @throws Error if input array is empty or contains no valid instructions
 */
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
        calculateBaselineWeightedEfficiencyScore(min, median, mean);

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

/**
 * Calculates the mean of an array of numbers
 * @param instructions Array of instruction counts
 * @returns Arithmetic mean
 */
function calculateMean(instructions: number[]): number {
    return (
        instructions.reduce((acc, val) => acc + val, 0) / instructions.length
    );
}

/**
 * Calculates the median of a sorted array of numbers
 * @param sorted Sorted array of numbers
 * @returns Median value
 */
function calculateMedian(sorted: number[]): number {
    const mid = Math.floor(sorted.length / 2);
    return sorted.length % 2 === 0
        ? (sorted[mid - 1] + sorted[mid]) / 2
        : sorted[mid];
}

/**
 * Calculates the standard deviation of an array of numbers
 * @param instructions Array of instruction counts
 * @returns Standard deviation
 */
function calculateStandardDeviation(instructions: number[]): number {
    const mean = calculateMean(instructions);
    return Math.sqrt(
        instructions
            .map((value) => Math.pow(value - mean, 2))
            .reduce((acc, val) => acc + val, 0) / instructions.length
    );
}

/**
 * Calculates a weighted efficiency score based on min, median, and mean values
 * @param min Minimum instruction count
 * @param median Median instruction count
 * @param mean Mean instruction count
 * @returns Weighted efficiency score
 */
function calculateBaselineWeightedEfficiencyScore(
    min: number,
    median: number,
    mean: number
): number {
    return (
        BASELINE_EFFICIENCY_WEIGHTS.min * min +
        BASELINE_EFFICIENCY_WEIGHTS.median * median +
        BASELINE_EFFICIENCY_WEIGHTS.mean * mean
    );
}
