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
    await updateJsonFile(results, version);
    await outputMarkdownFromJson();
    console.info(`Report generated at ${MARKDOWN_FILE}`);
}

async function updateJsonFile(
    results: Statistics,
    version: string
): Promise<void> {
    const fileContent = await readFile(RESULTS_FILE, 'utf-8');
    const allResults: Record<string, Statistics> = JSON.parse(fileContent);

    const updatedResults = { ...allResults, [version]: results };
    await writeFile(RESULTS_FILE, JSON.stringify(updatedResults, null, 4));
}

async function outputMarkdownFromJson(): Promise<void> {
    const markdownContent = await generateMarkdownReport();
    await writeFile(MARKDOWN_FILE, markdownContent);
}

async function generateMarkdownReport(): Promise<string> {
    const fileContent = await readFile(RESULTS_FILE, 'utf-8');
    const allResults: Record<string, Statistics> = JSON.parse(fileContent);

    return `# Benchmark Results

${Object.entries(allResults).reduce((acc, [version, stats], index) => {
    const comparison = compareChanges(allResults, index);
    return (
        acc +
        (acc ? '\n\n' : '') +
        generateVersionTable(version, stats, comparison)
    );
}, '')}

---
*Report generated automatically by Azle benchmark tools*`;
}

function generateVersionTable(
    version: string,
    results: Statistics,
    comparisonResults: Statistics
): string {
    return `## Version (\`${version}\`)

| Metric | Value | Change |
|--------|-------|--------|
${Object.entries(results)
    .map(([key, value]) => {
        const change = comparisonResults[key as keyof Statistics];
        let changeText = `${change.toFixed(2)}%`;
        if (change < 0) {
            changeText = `<span style="color: green">${changeText}</span>`;
        } else if (change > 0) {
            changeText = `<span style="color: red">${changeText}</span>`;
        }
        return `| ${camelToTitleCase(key)} | ${formatNumber(
            Math.floor(value)
        )} | ${changeText} |`;
    })
    .join('\n')}`;
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
    const changes = {} as Statistics;

    // Calculate changes for all properties in Statistics
    for (const key in previous) {
        changes[key as keyof Statistics] = calculateChange(
            previous[key as keyof Statistics],
            current[key as keyof Statistics]
        );
    }

    return changes;
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

function formatNumber(num: number): string {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '_');
}
