import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';

import { AZLE_PACKAGE_PATH } from '../../src/build/stable/utils/global_paths';
import { Statistics } from './statistics';

const RESULTS_FILE = join(AZLE_PACKAGE_PATH, 'benchmark_stats.json');

export async function reportResults(
    results: Statistics,
    version: string
): Promise<void> {
    const fileContent = await readFile(RESULTS_FILE, 'utf-8');
    const allResults: Record<string, Statistics> = JSON.parse(fileContent);

    const updatedResults = { ...allResults, [version]: results };
    await writeFile(RESULTS_FILE, JSON.stringify(updatedResults, null, 2));

    const comparisonResults = compareChanges(updatedResults);

    const versionResults = Object.entries(results).reduce(
        (acc, [key, value]) =>
            `${acc}- ${camelToTitleCase(key)}: ${value.toFixed(0)}\n`,
        `\`${version}\` results:\n`
    );
    console.log(versionResults);
    console.log(comparisonResults);
}

function compareChanges(results: Record<string, Statistics>): string {
    const versions = Object.keys(results);
    if (versions.length >= 2) {
        const [previous, current] = versions.slice(-2);
        const changes = calculateVersionChanges(
            results[previous],
            results[current]
        );

        return Object.entries(changes).reduce(
            (acc, [key, value]) =>
                `${acc}- ${camelToTitleCase(
                    key.replace('Change', '')
                )}: ${value.toFixed(2)}%\n`,
            `\nPerformance changes from \`${previous}\` to \`${current}\`:\n`
        );
    }
    return '';
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

function camelToTitleCase(camelCase: string): string {
    // Split the camelCase string into words
    const words = camelCase.replace(/([A-Z])/g, ' $1').split(' ');

    // Capitalize first letter of each word and join
    return words
        .map(
            (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )
        .join(' ')
        .trim();
}
