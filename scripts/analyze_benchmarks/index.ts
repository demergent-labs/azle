import { join } from 'path';

import { version as currentAzleVersion } from '../../package.json';
import { AZLE_PACKAGE_PATH } from '../../src/build/stable/utils/global_paths';
import { extractBenchmarksEntriesFromFiles } from './extractor';
import { findBenchmarkFiles } from './file_finder';
import { reportResults, StableAndExperimentalStatistics } from './reporter';
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
        join(AZLE_PACKAGE_PATH, 'examples', 'stable')
    );
    const experimentalBenchmarkFilePaths = await findBenchmarkFiles(
        join(AZLE_PACKAGE_PATH, 'examples', 'experimental')
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
    const statistics = await analyzeBenchmarksForVersion(versionToAnalyze);
    await reportResults(statistics, versionToAnalyze);
}

runBenchmarkAnalysis(process.argv[2]);
