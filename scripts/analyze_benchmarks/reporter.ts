import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';

import { AZLE_PACKAGE_PATH } from '../../src/build/stable/utils/global_paths';
import { Statistics } from './statistics';

const RESULTS_FILE = join(AZLE_PACKAGE_PATH, 'benchmark_stats.json');
const MARKDOWN_FILE = RESULTS_FILE.replace('.json', '.md');

export async function reportResults(
    results: Statistics,
    version: string
): Promise<void> {
    await updateBenchmarkJsonFile(results, version);
    await outputMarkdownFromJson();
}

async function readBenchmarkJsonFile(): Promise<Record<string, Statistics>> {
    const fileContent = await readFile(RESULTS_FILE, 'utf-8');
    return JSON.parse(fileContent);
}

async function updateBenchmarkJsonFile(
    newResults: Statistics,
    version: string
): Promise<void> {
    const previousResults = await readBenchmarkJsonFile();
    const allResults = { ...previousResults, [version]: newResults };
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
    benchmarksJson: Record<string, Statistics>
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
    results: Statistics,
    comparisonResults: Statistics
): string {
    return `## Version (\`${version}\`)

| Metric | Value | Change |
|--------|-------|--------|
${generateTableRows(results, comparisonResults)}`;
}

function generateTableRows(
    results: Statistics,
    comparisonResults: Statistics
): string {
    return Object.entries(results)
        .map(([key, value]) => {
            const change = comparisonResults[key as keyof Statistics];
            const metric = camelToTitleCase(key);
            const formattedValue = formatNumber(Math.floor(value));
            const formattedChange = formatChangeValue(change);
            return `| ${metric} | ${formattedValue} | ${formattedChange} |`;
        })
        .join('\n');
}

function formatChangeValue(change: number): string {
    if (change === 0) return `${change.toFixed(2)}%`;
    return `<span style="color: ${change < 0 ? 'green' : 'red'}">${change.toFixed(2)}%</span>`;
}

function compareChanges(
    results: Record<string, Statistics>,
    index: number
): Statistics {
    const versions = Object.keys(results);
    if (index + 1 < versions.length) {
        const previous = versions[index + 1];
        const current = versions[index];
        return calculateVersionChanges(results[previous], results[current]);
    }
    // Return a Statistics object with all values set to 0 if there's no previous version
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
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '_');
}
