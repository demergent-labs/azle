import { BenchmarkEntry } from './extractor';

export type Statistics = {
    count: number;
    mean: number;
    median: number;
    standardDeviation: number;
    min: number;
    baselineWeightedEfficiencyScore: number;
};

export function calculateVersionStatistics(
    entries: BenchmarkEntry[]
): Statistics {
    return calculateStatistics(
        entries.map((entry) => Number(entry.instructions.__bigint__))
    );
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
        baselineWeightedEfficiencyScore:
            calculateBaselineWeightEfficiencyScores({
                count: instructions.length,
                mean,
                median,
                standardDeviation,
                min: sorted[0],
                baselineWeightedEfficiencyScore: 0
            })
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
