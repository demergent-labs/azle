import semver from 'semver';

import {
    readBenchmarkJsonFile,
    StableAndExperimentalStatistics,
    StableOrExperimental
} from './reporter';
import { Error, Statistics } from './statistics';

export async function generateMarkdownReport(): Promise<string> {
    const benchmarksJson = await readBenchmarkJsonFile();

    const sortedBenchmarks = Object.fromEntries(
        Object.entries(benchmarksJson).sort(([a], [b]) => {
            return -semver.compare(a, b); // Reverse sort (newest first)
        })
    );

    return `# Benchmarks

${generateVersionTables(sortedBenchmarks)}

---
*Report generated automatically by Azle*`;
}

function generateVersionTables(
    benchmarksJson: Record<
        string,
        Record<StableOrExperimental, Statistics> | Error
    >
): string {
    return Object.entries(benchmarksJson).reduce(
        (acc, [version, stats], index) => {
            // Check if this version has an error
            if ('error' in stats) {
                const errorMessage = `## Version \`${version}\`\n\n⚠️ **WARNING: Benchmark analysis failed for version ${version}**\n\n**Error:** ${stats.error}\n\n`;
                return `${acc}${errorMessage}`;
            }

            const comparison = compareChanges(benchmarksJson, index);
            const versionTable = generateVersionTable(
                version,
                stats,
                comparison
            );
            return `${acc}${versionTable}\n\n`;
        },
        ''
    );
}

function generateVersionTable(
    version: string,
    results: StableAndExperimentalStatistics,
    comparisonResults: StableAndExperimentalStatistics
): string {
    return `## Version \`${version}\`

<table>
    <tr>
        <th></th>
        <th colspan="2">Stable</th>
        <th colspan="2">Experimental</th>
    </tr>
    ${generateBWEScoresTableRows(results, comparisonResults)}
    ${generateTableSpacer()}
    ${generateCountTableRows(results, comparisonResults)}
    ${generateTableSpacer()}
    ${generateStatsTableRows(results, comparisonResults)}
</table>`;
}

function generateTableSpacer(): string {
    return `<tr>
        <td colspan="5">&nbsp;</td>
    </tr>`;
}

function generateCountTableRows(
    results: StableAndExperimentalStatistics,
    comparisonResults: StableAndExperimentalStatistics
): string {
    return `<tr>
        <th></th>
        <th>Count</th>
        <th></th>
        <th>Count</th>
        <th></th>
    </tr>
    <tr>
        <td>Method Executions</td>
        <td>${results.stable.count}</td>
        <td>${formatChangeValue(comparisonResults.stable.count)}</td>
        <td>${results.experimental.count}</td>
        <td>${formatChangeValue(comparisonResults.experimental.count)}</td>
    </tr>`;
}

function generateBWEScoresTableRows(
    results: StableAndExperimentalStatistics,
    comparisonResults: StableAndExperimentalStatistics
): string {
    return `<tr>
        <th>Metric</th>
        <th>Score</th>
        <th>Change</th>
        <th>Score</th>
        <th>Change</th>
    </tr>
    <tr>
        <td>Baseline Weighted Efficiency</td>
        <td>${formatNumber(results.stable.baselineWeightedEfficiencyScore)}</td>
        <td>${formatChangeValue(comparisonResults.stable.baselineWeightedEfficiencyScore)}</td>
        <td>${formatNumber(results.experimental.baselineWeightedEfficiencyScore)}</td>
        <td>${formatChangeValue(comparisonResults.experimental.baselineWeightedEfficiencyScore)}</td>
    </tr>`;
}

function generateStatsTableRows(
    results: StableAndExperimentalStatistics,
    comparisonResults: StableAndExperimentalStatistics
): string {
    return `<tr>
        <th></th>
        <th>Number of Instructions</th>
        <th></th>
        <th>Number of Instructions</th>
        <th></th>
    </tr>
    ${Object.entries(results.stable)
        .filter(
            ([key]) =>
                key !== 'count' && key !== 'baselineWeightedEfficiencyScore'
        )
        .map(([key, value]) => {
            const statsKey = key as keyof Statistics;
            const stableChange = comparisonResults.stable[statsKey];
            const experimentalChange = comparisonResults.experimental[statsKey];
            const metric = camelToTitleCase(key);
            const stableFormattedValue = formatNumber(
                Math.floor(value as number)
            );
            const experimentalFormattedValue = formatNumber(
                Math.floor(results.experimental[statsKey] as number)
            );
            const stableFormattedChange = formatChangeValue(
                stableChange as number
            );
            const experimentalFormattedChange = formatChangeValue(
                experimentalChange as number
            );

            return `\t<tr>
        <td>${metric}</td>
        <td>${stableFormattedValue}</td>
        <td>${stableFormattedChange}</td>
        <td>${experimentalFormattedValue}</td>
        <td>${experimentalFormattedChange}</td>
    </tr>`;
        })
        .join('\n')}
`;
}

function formatChangeValue(change: number): string {
    if (change === 0) {
        return `${change.toFixed(2)}%`;
    }

    return `<span style="color: ${change < 0 ? 'green' : 'red'}">${change.toFixed(2)}%</span>`;
}

function compareChanges(
    results: Record<string, Record<StableOrExperimental, Statistics> | Error>,
    index: number
): StableAndExperimentalStatistics {
    const versions = Object.keys(results);
    if (index + 1 < versions.length) {
        const previous = versions[index + 1];
        const current = versions[index];

        const previousData = results[previous];
        const currentData = results[current];

        // If either previous or current has an error, return default statistics
        if ('error' in previousData || 'error' in currentData) {
            return {
                stable: createDefaultStatistics(),
                experimental: createDefaultStatistics()
            };
        }

        const stable = calculateVersionChanges(
            previousData.stable,
            currentData.stable
        );
        const experimental = calculateVersionChanges(
            previousData.experimental,
            currentData.experimental
        );
        return { stable, experimental };
    }

    return {
        stable: createDefaultStatistics(),
        experimental: createDefaultStatistics()
    };
}

function createDefaultStatistics(): Statistics {
    return {
        baselineWeightedEfficiencyScore: 0,
        mean: 0,
        median: 0,
        min: 0,
        count: 0,
        standardDeviation: 0,
        max: 0
    };
}

function calculateChange(prevValue: number, currValue: number): number {
    return ((currValue - prevValue) / prevValue) * 100;
}

function calculateVersionChanges(
    previous: Statistics,
    current: Statistics
): Statistics {
    return Object.keys(previous).reduce((changes, key) => {
        const statsKey = key as keyof Statistics;
        const prevValue = previous[statsKey] as number;
        const currValue = current[statsKey] as number;
        return {
            ...changes,
            [statsKey]: calculateChange(prevValue, currValue)
        };
    }, {} as Statistics);
}

function camelToTitleCase(camelCase: string): string {
    const words = camelCase.replace(/([A-Z])/g, ' $1').split(' ');
    return words.map(capitalizeWord).join(' ').trim();
}

function capitalizeWord(word: string): string {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

function formatNumber(num: number): string {
    return Math.floor(num)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, '_');
}
