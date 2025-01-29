import * as dns from 'node:dns';
dns.setDefaultResultOrder('ipv4first');

import { describe, expect, test } from '@jest/globals';
import * as fc from 'fast-check';

import { execSyncPretty } from '../src/build/stable/utils/exec_sync_pretty';
export { expect } from '@jest/globals';
import { runBenchmarksForCanisters } from './benchmarks';
import { runFuzzTests } from './fuzz';

export type Test = () => void;

export { getCanisterActor } from './get_canister_actor';

export interface RunTestsOptions {
    /**
     * Whether to set up the agent before running tests
     * @default true
     */
    shouldSetupAgent: boolean;
}

export const DEFAULT_RUN_TESTS_OPTIONS: RunTestsOptions = {
    shouldSetupAgent: true
};

export function runTests(
    tests: Test,
    canisterNames: string | string[] | undefined = undefined,
    _cwd: string = process.cwd(),
    options: RunTestsOptions = DEFAULT_RUN_TESTS_OPTIONS
): void {
    const {
        shouldRunTests,
        shouldRunTypeChecks,
        shouldRecordBenchmarks,
        shouldFuzz
    } = processEnvVars();

    if (options.shouldSetupAgent === true) {
        describe('agent setup', () => {
            // TODO temporary fix for https://github.com/demergent-labs/azle/issues/2496
            wait('for root key to be fetched', 5_000);
        });
    }

    if (shouldRunTests === true) {
        describe(`tests`, tests);
    }

    if (shouldRunTypeChecks === true) {
        describe(`type checks`, () => {
            it('checks types', () => {
                try {
                    execSyncPretty(
                        `npm exec --offline tsc -- --noEmit --skipLibCheck --target es2020 --strict --moduleResolution node --allowJs`,
                        'inherit'
                    );
                } catch {
                    expect('Type checking failed').toBe(
                        'Type checking to pass'
                    );
                }
            });
        });
    }

    if (shouldRecordBenchmarks === true && canisterNames !== undefined) {
        const canisterNamesArray = Array.isArray(canisterNames)
            ? canisterNames
            : [canisterNames];

        describe(`benchmarks`, () => {
            it('runs benchmarks for all canisters', () =>
                runBenchmarksForCanisters(canisterNamesArray));
        });
    }

    if (shouldFuzz === true) {
        describe(`fuzz`, () => {
            it('runs fuzz tests for all canisters', runFuzzTests);
        });
    }
}

export function wait(name: string, delay: number): void {
    runWait(test, name, delay);
}

wait.skip = (name: string, delay: number): void =>
    runWait(test.skip, name, delay);
wait.only = (name: string, delay: number): void =>
    runWait(test.only, name, delay);

export function please(name: string, fn: () => void | Promise<void>): void {
    test(`please ${name}`, async () => {
        console.info(`Preparing: ${name}`);
        await fn();
    });
}
please.skip = test.skip;
please.only = test.only;

export function it(name: string, fn: () => void | Promise<void>): void {
    test(`it ${name}`, async () => {
        console.info(`Testing: ${name}`);
        await fn();
    });
}
it.only = test.only;
it.skip = test.skip;

export function defaultPropTestParams<T = unknown>(): fc.Parameters<T> {
    const baseParams = {
        numRuns: Number(process.env.AZLE_PROPTEST_NUM_RUNS ?? 1),
        endOnFailure: process.env.AZLE_PROPTEST_SHRINK === 'true' ? false : true
    };

    const seed =
        process.env.AZLE_PROPTEST_SEED !== undefined
            ? Number(process.env.AZLE_PROPTEST_SEED)
            : undefined;

    const path = process.env.AZLE_PROPTEST_PATH;

    return seed !== undefined ? { ...baseParams, seed, path } : baseParams;
}

/**
 * Wraps a fast-check property test assertion and provides a helpful error message if the test fails.
 *
 * @param assertion - The fast-check property test assertion to run
 * @throws Error with reproduction command and original error message if the assertion fails
 *
 * @remarks
 * The error message includes:
 * 1. A command that can be used to reproduce the exact failing test case
 * 2. The original error message from fast-check
 */
export async function runAndProvideReproduction(
    assertion: () => Promise<void>
): Promise<void> {
    try {
        await assertion();
    } catch (error) {
        const errorOutput =
            error instanceof Error ? error.message : String(error);
        const reproductionCommand =
            formatPropertyTestReproductionCommand(errorOutput);
        throw new Error(
            `To reproduce this exact test case, run:
${reproductionCommand}

Test failed with:
${errorOutput}
`
        );
    }
}

function processEnvVars(): {
    shouldRunTests: boolean;
    shouldRunTypeChecks: boolean;
    shouldRecordBenchmarks: boolean;
    shouldFuzz: boolean;
} {
    const runTests = process.env.AZLE_RUN_TESTS ?? 'true';
    const runTypeChecks = process.env.AZLE_RUN_TYPE_CHECKS ?? 'true';
    const recordBenchmarks = process.env.AZLE_RECORD_BENCHMARKS ?? 'false';
    const fuzz = process.env.AZLE_FUZZ ?? 'false';

    const hasOnly = [runTests, runTypeChecks, fuzz].includes('only');

    return {
        shouldRunTests: shouldRun(runTests, hasOnly, true),
        shouldRunTypeChecks: shouldRun(runTypeChecks, hasOnly, true),
        shouldRecordBenchmarks: recordBenchmarks === 'true' && !hasOnly,
        shouldFuzz: shouldRun(fuzz, hasOnly, false)
    };
}

function shouldRun(
    envVar: string,
    hasOnly: boolean,
    runByDefault: boolean
): boolean {
    if (hasOnly === true) {
        return envVar === 'only';
    }

    if (runByDefault === true) {
        return envVar !== 'false';
    }

    return envVar === 'true';
}

function runWait(
    testFn: typeof test | typeof test.only | typeof test.skip,
    name: string,
    delay: number
): void {
    testFn(`wait ${name}`, createWait(name, delay), delay + 1_000);
}

function createWait(name: string, delay: number): () => Promise<void> {
    return async () => {
        console.info(`Waiting: ${delay} milliseconds ${name}`);
        await new Promise((resolve) => {
            setTimeout(resolve, delay);
        });
    };
}

/**
 * @internal
 *
 * Extracts the seed and path from a fast-check error message and formats them into a command
 * that can be used to reproduce the exact test case that failed.
 *
 * @param error - The error message from fast-check containing seed and path information
 * @returns A command string that can be used to reproduce the exact test case that failed
 */
function formatPropertyTestReproductionCommand(error: string): string {
    // Look for the fast-check error details in the full stack trace
    const fcErrorMatch = error.match(
        /Property failed after \d+ tests[\s\S]*?{ seed: (-?\d+), path: "([^"]+)"/
    );

    if (fcErrorMatch === null) {
        return 'Could not parse fast-check error output';
    }

    const [, seed, path] = fcErrorMatch;
    return `AZLE_PROPTEST_SEED=${seed} AZLE_PROPTEST_PATH="${path}" npm test`;
}
