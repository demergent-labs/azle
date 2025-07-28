import { appendFile, readFile, writeFile } from 'fs/promises';
import { join } from 'path';

import { AZLE_ROOT } from '#utils/global_paths';

import { generateMarkdownReport } from './markdown';
import { Statistics } from './statistics';

export type StableOrExperimental = 'stable' | 'experimental';
export type StableAndExperimentalStatistics = {
    stable: Statistics;
    experimental: Statistics;
};

export const RESULTS_FILE = join(AZLE_ROOT, 'benchmarks.json');
export const MARKDOWN_FILE = RESULTS_FILE.replace('.json', '.md');

/**
 * Reports benchmark results by updating JSON file and generating markdown report
 * @param results Statistics for stable and experimental benchmarks
 * @param version Version string for the results
 */
export async function reportResults(
    results: StableAndExperimentalStatistics,
    version: string
): Promise<void> {
    await updateBenchmarkJsonFile(results, version);
    await outputMarkdownFromJson();
}

export async function reportErrorResult(
    error: string,
    version: string
): Promise<void> {
    const errorMessage = `## Version \`${version}\`\n\n⚠️ **WARNING: Benchmark analysis failed for version ${version}**\n\n**Error:** ${error}\n\n`;
    await appendFile(MARKDOWN_FILE, errorMessage);
}

/**
 * Reads the benchmark statistics from the JSON file
 * @returns Record of version-keyed benchmark statistics
 */
export async function readBenchmarkJsonFile(): Promise<
    Record<string, Record<StableOrExperimental, Statistics>>
> {
    const fileContent = await readFile(RESULTS_FILE, 'utf-8');
    return JSON.parse(fileContent);
}

async function updateBenchmarkJsonFile(
    newResults: StableAndExperimentalStatistics,
    version: string
): Promise<void> {
    const previousResults = await readBenchmarkJsonFile();
    const allResults = {
        ...previousResults,
        [version]: newResults
    };
    await writeFile(RESULTS_FILE, JSON.stringify(allResults, null, 4));
}

async function outputMarkdownFromJson(): Promise<void> {
    const markdownContent = await generateMarkdownReport();
    await writeFile(MARKDOWN_FILE, markdownContent);
}
