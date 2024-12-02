import { version as currentAzleVersion } from '../../package.json';
import { AZLE_PACKAGE_PATH } from '../../src/build/stable/utils/global_paths';
import { extractBenchmarksEntriesFromFiles } from './extractor';
import { findBenchmarkFiles } from './file_finder';
import { reportResults } from './reporter';
import { calculateVersionStatistics, Statistics } from './statistics';

async function analyzeBenchmarksForVersion(
    targetVersion: string
): Promise<[Statistics, Statistics]> {
    const benchmarkFilePaths = await findBenchmarkFiles(AZLE_PACKAGE_PATH);

    const benchmarkEntriesByVersion =
        await extractBenchmarksEntriesFromFiles(benchmarkFilePaths);
    const targetVersionEntries = benchmarkEntriesByVersion[targetVersion];

    return calculateVersionStatistics(targetVersionEntries);
}

function runBenchmarkAnalysis(specifiedVersion?: string): void {
    const versionToAnalyze = specifiedVersion ?? currentAzleVersion;
    console.log('Analyzing benchmarks...');
    analyzeBenchmarksForVersion(versionToAnalyze).then((statistics) =>
        reportResults(statistics[1], versionToAnalyze)
    );
}

runBenchmarkAnalysis(process.argv[2]);
