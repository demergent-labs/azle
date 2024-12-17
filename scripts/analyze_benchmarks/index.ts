import { join } from 'path';

import { version as currentAzleVersion } from '../../package.json';
import { AZLE_PACKAGE_PATH } from '../../src/build/stable/utils/global_paths';
import { extractBenchmarksEntriesFromFiles } from './extractor';
import { findBenchmarkFiles } from './file_finder';
import { reportResults } from './reporter';
import { calculateVersionStatistics, Statistics } from './statistics';

async function analyzeBenchmarksForVersion(
    targetVersion: string
): Promise<[Statistics, Statistics]> {
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

    return [
        calculateVersionStatistics(targetVersionStableEntries),
        calculateVersionStatistics(targetVersionExperimentalEntries)
    ];
}

function runBenchmarkAnalysis(specifiedVersion?: string): void {
    const versionToAnalyze = specifiedVersion ?? currentAzleVersion;
    console.info('Analyzing benchmarks...');
    analyzeBenchmarksForVersion(versionToAnalyze).then((statistics) =>
        reportResults(statistics, versionToAnalyze)
    );
}

runBenchmarkAnalysis(process.argv[2]);
