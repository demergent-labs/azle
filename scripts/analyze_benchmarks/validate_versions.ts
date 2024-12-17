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

type BenchmarkEntry = {
    previous?: { version: string };
    current: { version: string };
};

type BenchmarkData = Record<string, BenchmarkEntry>;

/**
 * Validates benchmark entries against expected versions
 * @param filePath Path to the benchmark file
 * @param entry Benchmark entry to validate
 * @param expectedCurrentVersion Expected current version
 * @param expectedPreviousVersion Expected previous version
 * @returns Array of validation issues found
 */
function validateEntry(
    filePath: string,
    entry: BenchmarkEntry,
    expectedCurrentVersion: string,
    expectedPreviousVersion: string
): BenchmarkIssue[] {
    if (entry.previous === undefined) {
        return [
            {
                filePath,
                type: 'missing_previous',
                expectedVersion: expectedPreviousVersion
            }
        ];
    }

    return [
        entry.previous.version !== expectedPreviousVersion && {
            filePath,
            type: 'wrong_previous_version',
            expectedVersion: expectedPreviousVersion,
            actualVersion: entry.previous.version
        },
        entry.current.version !== expectedCurrentVersion && {
            filePath,
            type: 'wrong_current_version',
            expectedVersion: expectedCurrentVersion,
            actualVersion: entry.current.version
        }
    ].filter(Boolean) as BenchmarkIssue[];
}

/**
 * Validates versions in a benchmark file
 * @param filePath Path to the benchmark file
 * @param expectedCurrentVersion Expected current version
 * @param expectedPreviousVersion Expected previous version
 * @returns Array of validation issues found
 */
async function validateFile(
    filePath: string,
    expectedCurrentVersion: string,
    expectedPreviousVersion: string
): Promise<BenchmarkIssue[]> {
    const content = await fs.readFile(filePath, 'utf-8');
    const benchmarkData: BenchmarkData = JSON.parse(content);

    return Object.values(benchmarkData).flatMap((entry) =>
        validateEntry(
            filePath,
            entry,
            expectedCurrentVersion,
            expectedPreviousVersion
        )
    );
}

/**
 * Validates versions across multiple benchmark files
 * @param benchmarkFilePaths Array of paths to benchmark files
 * @param expectedCurrentVersion Expected current version
 * @param expectedPreviousVersion Expected previous version
 * @returns Array of all validation issues found
 */
async function validateBenchmarkVersions(
    benchmarkFilePaths: string[],
    expectedCurrentVersion: string,
    expectedPreviousVersion: string
): Promise<BenchmarkIssue[]> {
    const allIssues = await Promise.all(
        benchmarkFilePaths.map((filePath) =>
            validateFile(
                filePath,
                expectedCurrentVersion,
                expectedPreviousVersion
            )
        )
    );
    return allIssues.flat();
}

function groupIssuesByType(issues: BenchmarkIssue[]): {
    missingPrevious: BenchmarkIssue[];
    wrongPrevious: BenchmarkIssue[];
    wrongCurrent: BenchmarkIssue[];
} {
    return {
        missingPrevious: issues.filter(
            (issue) => issue.type === 'missing_previous'
        ),
        wrongPrevious: issues.filter(
            (issue) => issue.type === 'wrong_previous_version'
        ),
        wrongCurrent: issues.filter(
            (issue) => issue.type === 'wrong_current_version'
        )
    };
}

function printIssues(
    groupedIssues: ReturnType<typeof groupIssuesByType>,
    currentVersion: string,
    previousVersion: string
): void {
    const { missingPrevious, wrongPrevious, wrongCurrent } = groupedIssues;

    if (missingPrevious.length > 0) {
        console.warn('\nFiles missing "previous" key:');
        missingPrevious.forEach((issue) => {
            console.warn(`- ${issue.filePath}`);
        });
    }

    if (wrongPrevious.length > 0) {
        console.warn(
            `\nFiles with incorrect previous version (expected ${previousVersion}):`
        );
        wrongPrevious.forEach((issue) => {
            console.warn(
                `- ${issue.filePath} (found version: ${issue.actualVersion})`
            );
        });
    }

    if (wrongCurrent.length > 0) {
        console.warn(
            `\nFiles with incorrect current version (expected ${currentVersion}):`
        );
        wrongCurrent.forEach((issue) => {
            console.warn(
                `- ${issue.filePath} (found version: ${issue.actualVersion})`
            );
        });
    }

    console.warn('\n');
}

async function main(): Promise<void> {
    const [currentVersion, previousVersion] = process.argv.slice(2);

    if (currentVersion === undefined || previousVersion === undefined) {
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
        printIssues(groupIssuesByType(issues), currentVersion, previousVersion);
        process.exit(1);
    }

    console.info('All benchmark versions are valid! ✨');
}

main();
