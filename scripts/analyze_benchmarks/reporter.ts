import { Statistics } from './statistics';

export function reportResults(results: Record<string, Statistics>): void {
    compareChanges(results);
    console.log(JSON.stringify(results, null, 2));
}

function compareChanges(results: Record<string, Statistics>): void {
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

function calculateChange(prevValue: number, currValue: number): number {
    return ((prevValue - currValue) / prevValue) * 100;
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
