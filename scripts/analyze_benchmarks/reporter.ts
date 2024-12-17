import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';

import { AZLE_PACKAGE_PATH } from '../../src/build/stable/utils/global_paths';
import { Statistics } from './statistics';

type StableOrExperimental = 'stable' | 'experimental';

const RESULTS_FILE = join(AZLE_PACKAGE_PATH, 'benchmark_stats.json');
const MARKDOWN_FILE = RESULTS_FILE.replace('.json', '.md');

export async function reportResults(
    results: [Statistics, Statistics],
    version: string
): Promise<void> {
    await updateBenchmarkJsonFile(results, version);
    await outputMarkdownFromJson();
}

async function readBenchmarkJsonFile(): Promise<
    Record<string, Record<StableOrExperimental, Statistics>>
> {
    const fileContent = await readFile(RESULTS_FILE, 'utf-8');
    return JSON.parse(fileContent);
}

async function updateBenchmarkJsonFile(
    newResults: [Statistics, Statistics],
    version: string
): Promise<void> {
    const previousResults = await readBenchmarkJsonFile();
    const allResults = {
        ...previousResults,
        [version]: {
            stable: newResults[0],
            experimental: newResults[1]
        }
    };
    await writeFile(RESULTS_FILE, JSON.stringify(allResults, null, 4));
}

async function outputMarkdownFromJson(): Promise<void> {
    const markdownContent = await generateMarkdownReport();
    await writeFile(MARKDOWN_FILE, markdownContent);
    console.info(`Report generated at ${MARKDOWN_FILE}`);
}

async function generateMarkdownReport(): Promise<string> {
    const benchmarksJson = await readBenchmarkJsonFile();
    return `# Benchmark Results

${generateVersionTables(benchmarksJson)}

---
*Report generated automatically by Azle benchmark tools*`;
}

function generateVersionTables(
    benchmarksJson: Record<string, Record<StableOrExperimental, Statistics>>
): string {
    return Object.entries(benchmarksJson).reduce(
        (acc, [version, stats], index) => {
            const comparison = compareChanges(benchmarksJson, index);
            return (
                acc +
                (acc === '' ? '' : '\n\n') +
                generateVersionTable(version, stats, comparison)
            );
        },
        ''
    );
}

function generateVersionTable(
    version: string,
    results: Record<StableOrExperimental, Statistics>,
    comparisonResults: Record<StableOrExperimental, Statistics>
): string {
    return `## Version \`${version}\`

Stable Benchmarks based on ${results.stable.count} method executions.

Experimental Benchmarks based on ${results.experimental.count} method executions.

Baseline Weighted Efficiency Score:

- Stable: ${formatNumber(
        results.stable.baselineWeightedEfficiencyScore
    )} (${formatChangeValue(
        comparisonResults.stable.baselineWeightedEfficiencyScore
    )})

- Experimental: ${formatNumber(
        results.experimental.baselineWeightedEfficiencyScore
    )} (${formatChangeValue(
        comparisonResults.experimental.baselineWeightedEfficiencyScore
    )})

<table>
<tr>
    <th></th>
    <th colspan="2">Stable</th>
    <th colspan="2">Experimental</th>
</tr>
<tr>
    <th>Metric</th>
    <th>Number of Instructions</th>
    <th>Change</th>
    <th>Number of Instructions</th>
    <th>Change</th>
</tr>
${generateTableRows(results, comparisonResults)}
</table>`;
}

function generateTableRows(
    results: Record<StableOrExperimental, Statistics>,
    comparisonResults: Record<StableOrExperimental, Statistics>
): string {
    return Object.entries(results.stable)
        .filter(
            ([key]) =>
                key !== 'baselineWeightedEfficiencyScore' && key !== 'count'
        )
        .map(([key, value]) => {
            const statsKey = key as keyof Statistics;
            const stableChange = comparisonResults.stable[statsKey];
            const experimentalChange = comparisonResults.experimental[statsKey];
            const metric = camelToTitleCase(key);
            const stableFormattedValue = formatNumber(Math.floor(value));
            const experimentalFormattedValue = formatNumber(
                Math.floor(results.experimental[statsKey])
            );
            const stableFormattedChange = formatChangeValue(stableChange);
            const experimentalFormattedChange =
                formatChangeValue(experimentalChange);

            return `<tr>
    <td>${metric}</td>
    <td>${stableFormattedValue}</td>
    <td>${stableFormattedChange}</td>
    <td>${experimentalFormattedValue}</td>
    <td>${experimentalFormattedChange}</td>
</tr>`;
        })
        .join('\n');
}

function formatChangeValue(change: number): string {
    if (change === 0) return `${change.toFixed(2)}%`;
    return `<span style="color: ${change < 0 ? 'green' : 'red'}">${change.toFixed(2)}%</span>`;
}

function compareChanges(
    results: Record<string, Record<StableOrExperimental, Statistics>>,
    index: number
): Record<StableOrExperimental, Statistics> {
    const versions = Object.keys(results);
    if (index + 1 < versions.length) {
        const previous = versions[index + 1];
        const current = versions[index];
        const stable = calculateVersionChanges(
            results[previous].stable,
            results[current].stable
        );
        const experimental = calculateVersionChanges(
            results[previous].experimental,
            results[current].experimental
        );
        return { stable, experimental };
    }
    // Return a Statistics object with all values set to 0 if there's no previous version
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
        const typedKey = key as keyof Statistics;
        changes[typedKey] = calculateChange(
            previous[typedKey],
            current[typedKey]
        );
        return changes;
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
