import { extractBenchmarkEntries, groupEntriesByVersion } from './extractor';
import { findBenchmarkFiles } from './file_finder';
import { reportResults } from './reporter';
import { calculateVersionStatistics, Statistics } from './statistics';

async function analyzeAllBenchmarks(
    rootDir: string = '.'
): Promise<Record<string, Statistics>> {
    const benchmarkFiles = await findBenchmarkFiles(rootDir);
    const versionEntriesArrays = await Promise.all(
        benchmarkFiles.map(extractBenchmarkEntries)
    );
    const versionEntries = versionEntriesArrays.flat();

    const entriesByVersion = groupEntriesByVersion(versionEntries);

    return Object.entries(entriesByVersion).reduce(
        (acc, [version, entries]) => ({
            ...acc,
            [version]: calculateVersionStatistics(entries)
        }),
        {} as Record<string, Statistics>
    );
}

function main(): void {
    console.log('Analyzing benchmarks...');
    analyzeAllBenchmarks().then(reportResults);
}

main();
