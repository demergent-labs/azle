import * as fs from 'fs/promises';

import { AZLE_PACKAGE_PATH } from '../../src/build/stable/utils/global_paths';
import { findBenchmarkFiles } from './file_finder';

type BenchmarkIssue = {
    filePath: string;
    type:
        | 'missing_previous'
        | 'wrong_previous_version'
        | 'wrong_current_version';
    expectedVersion: string;
    actualVersion?: string;
};

async function validateBenchmarkVersions(
    benchmarkFilePaths: string[],
    expectedCurrentVersion: string,
    expectedPreviousVersion: string
): Promise<BenchmarkIssue[]> {
    const issues: BenchmarkIssue[] = [];

    for (const filePath of benchmarkFilePaths) {
        try {
            const content = await fs.readFile(filePath, 'utf-8');
            const benchmarkData = JSON.parse(content);

            Object.values(benchmarkData).forEach((entry: any) => {
                if (!entry.previous) {
                    issues.push({
                        filePath,
                        type: 'missing_previous',
                        expectedVersion: expectedPreviousVersion
                    });
                    return;
                }

                if (entry.previous.version !== expectedPreviousVersion) {
                    issues.push({
                        filePath,
                        type: 'wrong_previous_version',
                        expectedVersion: expectedPreviousVersion,
                        actualVersion: entry.previous.version
                    });
                }

                if (entry.current.version !== expectedCurrentVersion) {
                    issues.push({
                        filePath,
                        type: 'wrong_current_version',
                        expectedVersion: expectedCurrentVersion,
                        actualVersion: entry.current.version
                    });
                }
            });
        } catch (error) {
            console.error(`Error reading/parsing file ${filePath}:`, error);
        }
    }

    return issues;
}

async function main(): Promise<void> {
    const [currentVersion, previousVersion] = process.argv.slice(2);

    if (!currentVersion || !previousVersion) {
        console.error(
            'Usage: node validate_versions.js <current_version> <previous_version>'
        );
        process.exit(1);
    }

    const benchmarkFilePaths = await findBenchmarkFiles(AZLE_PACKAGE_PATH);
    const issues = await validateBenchmarkVersions(
        benchmarkFilePaths,
        currentVersion,
        previousVersion
    );

    if (issues.length > 0) {
        console.warn('\nWarning: Issues found in benchmark files:');

        // Group issues by type
        const missingPrevious = issues.filter(
            (issue) => issue.type === 'missing_previous'
        );
        const wrongPrevious = issues.filter(
            (issue) => issue.type === 'wrong_previous_version'
        );
        const wrongCurrent = issues.filter(
            (issue) => issue.type === 'wrong_current_version'
        );

        if (missingPrevious.length > 0) {
            console.warn('\nFiles missing "previous" key:');
            missingPrevious.forEach((issue) =>
                console.warn(`- ${issue.filePath}`)
            );
        }

        if (wrongPrevious.length > 0) {
            console.warn(
                `\nFiles with incorrect previous version (expected ${previousVersion}):`
            );
            wrongPrevious.forEach((issue) =>
                console.warn(
                    `- ${issue.filePath} (found version: ${issue.actualVersion})`
                )
            );
        }

        if (wrongCurrent.length > 0) {
            console.warn(
                `\nFiles with incorrect current version (expected ${currentVersion}):`
            );
            wrongCurrent.forEach((issue) =>
                console.warn(
                    `- ${issue.filePath} (found version: ${issue.actualVersion})`
                )
            );
        }

        console.warn('\n');
        process.exit(1);
    }

    console.log('All benchmark versions are valid! ✨');
}

main().catch((error) => {
    console.error('Error:', error);
    process.exit(1);
});
