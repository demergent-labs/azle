import { join } from 'path';

import { AZLE_ROOT } from '#utils/global_paths';

import { version as currentAzleVersion } from '../../../package.json';
import { extractBenchmarksEntriesFromFiles } from './extractor';
import { findBenchmarkFiles } from './file_finder';
import {
    MARKDOWN_FILE,
    reportErrorResult,
    reportResults,
    StableAndExperimentalStatistics
} from './reporter';
import { calculateVersionStatistics } from './statistics';

/**
 * Analyzes benchmarks for a specific version across stable and experimental examples
 * @param targetVersion Version string to analyze
 * @returns Statistics for both stable and experimental benchmarks
 */
async function analyzeBenchmarksForVersion(
    targetVersion: string
): Promise<StableAndExperimentalStatistics> {
    const stableBenchmarkFilePaths = await findBenchmarkFiles(
        join(AZLE_ROOT, 'examples', 'stable')
    );
    const experimentalBenchmarkFilePaths = await findBenchmarkFiles(
        join(AZLE_ROOT, 'examples', 'experimental')
    );

    const stableBenchmarkEntriesByVersion =
        await extractBenchmarksEntriesFromFiles(stableBenchmarkFilePaths);
    const experimentalBenchmarkEntriesByVersion =
        await extractBenchmarksEntriesFromFiles(experimentalBenchmarkFilePaths);

    const targetVersionStableEntries =
        stableBenchmarkEntriesByVersion[targetVersion];
    const targetVersionExperimentalEntries =
        experimentalBenchmarkEntriesByVersion[targetVersion];

    return {
        stable: calculateVersionStatistics(targetVersionStableEntries),
        experimental: calculateVersionStatistics(
            targetVersionExperimentalEntries
        )
    };
}

/**
 * Runs the benchmark analysis for a specified version or current version
 * @param specifiedVersion Optional version to analyze. If not provided, uses current package version
 */
async function runBenchmarkAnalysis(specifiedVersion?: string): Promise<void> {
    const versionToAnalyze = specifiedVersion ?? currentAzleVersion;
    console.info('Analyzing benchmarks...');
    try {
        const statistics = await analyzeBenchmarksForVersion(versionToAnalyze);
        await reportResults(statistics, versionToAnalyze);
    } catch (error) {
        const errorMessage =
            error instanceof Error ? error.message : String(error);
        await reportErrorResult(errorMessage, versionToAnalyze);
    }
    console.info(`Report generated at ${MARKDOWN_FILE}`);
}

runBenchmarkAnalysis(process.argv[2]);
