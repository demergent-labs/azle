import * as dns from 'node:dns';
dns.setDefaultResultOrder('ipv4first');

import { describe, expect, test } from '@jest/globals';
import { DEFAULT_EXPECTED_ERRORS } from 'cuzz';

import { execSyncPretty } from '#utils/exec_sync_pretty';

import { recordsBenchmarksForCanisters } from './benchmarks';
import { getCanisterNames } from './canister_names';
import { getCuzzConfig, runFuzzTests } from './fuzz';
import { runGlobalStateChecks } from './global_state';
import {
    checkMemoryChanges,
    memoryState,
    takeMemorySnapshot
} from './memory_state';

export type Test = () => void;

export { getCanisterNames } from './canister_names';
export { getCanisterActor } from './get_canister_actor';
export { expect } from '@jest/globals';
export { defaultPropTestParams } from '#test/property/default_prop_test_params';

export function runTests(tests: Test): void {
    const {
        shouldRunTests,
        shouldCheckGlobalStateAfterTests,
        shouldCheckMemoryStateAfterTests,
        shouldRunTypeChecks,
        shouldRecordBenchmarks,
        shouldFuzz,
        shouldCheckGlobalStateAfterFuzzTests
    } = processEnvVars();

    (shouldRunTests === true ? describe : describe.skip)(
        `correctness tests`,
        () => {
            (shouldCheckMemoryStateAfterTests === true &&
                process.env.AZLE_EXPERIMENTAL !== 'true'
                ? please
                : please.skip)(
                'snapshot the canister memory size and heap allocation for all canisters before correctness tests',
                async () => {
                    const snapshot = await takeMemorySnapshot();

                    memoryState.correctness.heapAllocations =
                        snapshot.heapAllocations;
                    memoryState.correctness.memorySizes = snapshot.memorySizes;
                }
            );

            tests();

            (shouldCheckGlobalStateAfterTests === true ? it : it.skip)(
                'checks that all internal global state variables for all canisters are empty',
                runGlobalStateChecks
            );

            (shouldCheckMemoryStateAfterTests === true &&
                process.env.AZLE_EXPERIMENTAL !== 'true'
                ? it
                : it.skip)(
                'checks the canister memory size and heap allocation for all canisters after correctness tests',
                async () => {
                    await checkMemoryChanges(
                        memoryState.correctness.heapAllocations,
                        memoryState.correctness.memorySizes
                    );
                }
            );

            (shouldRunTypeChecks === true ? it : it.skip)(
                'checks TypeScript types',
                async () => {
                    const typeCheckCommand = `npm exec --offline tsc -- --skipLibCheck`; // TODO: remove skipLibCheck once https://github.com/demergent-labs/azle/issues/2690 is resolved
                    try {
                        execSyncPretty(typeCheckCommand, {
                            stdio: 'inherit'
                        });
                    } catch {
                        expect('Type checking failed').toBe(
                            'Type checking to pass'
                        );
                    }
                }
            );
        }
    );

    (shouldRecordBenchmarks === true ? describe : describe.skip)(
        `benchmarks`,
        () => {
            it('records benchmarks for all canisters', async () => {
                const canisterNames = await getCanisterNames();
                await recordsBenchmarksForCanisters(canisterNames);
            });
        }
    );

    (shouldFuzz === true && process.env.AZLE_EXPERIMENTAL !== 'true'
        ? describe
        : describe.skip)('fuzz tests', () => {
        please(
            'snapshot the canister memory size and heap allocation for all canisters before fuzz tests',
            async () => {
                const snapshot = await takeMemorySnapshot();
                memoryState.fuzz.heapAllocations = snapshot.heapAllocations;
                memoryState.fuzz.memorySizes = snapshot.memorySizes;
            }
        );

        it('runs fuzz tests', runFuzzTests);

        (shouldCheckGlobalStateAfterFuzzTests === true ? it : it.skip)(
            'checks that all internal global state variables for all canisters are empty',
            async () => {
                while (true) {
                    try {
                        await runGlobalStateChecks();
                    } catch (error: any) {
                        if (
                            isExpectedError(error, DEFAULT_EXPECTED_ERRORS) ===
                            true
                        ) {
                            continue;
                        }

                        throw error;
                    }
                    break;
                }
            }
        );

        it('checks the canister memory size and heap allocation for all canisters after fuzz tests', async () => {
            await checkMemoryChanges(
                memoryState.fuzz.heapAllocations,
                memoryState.fuzz.memorySizes
            );
        });
    });
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

function processEnvVars(): {
    shouldRunTests: boolean;
    shouldCheckGlobalStateAfterTests: boolean;
    shouldCheckMemoryStateAfterTests: boolean;
    shouldRunTypeChecks: boolean;
    shouldRecordBenchmarks: boolean;
    shouldFuzz: boolean;
    shouldCheckGlobalStateAfterFuzzTests: boolean;
} {
    const runTests = process.env.AZLE_RUN_TESTS ?? 'true';
    const checkGlobalStateAfterTests =
        process.env.AZLE_CHECK_GLOBAL_STATE_AFTER_TESTS ?? 'true';
    const checkMemoryStateAfterTests =
        process.env.AZLE_CHECK_MEMORY_STATE_AFTER_TESTS ?? 'true';
    const runTypeChecks = process.env.AZLE_RUN_TYPE_CHECKS ?? 'true';
    const recordBenchmarks = process.env.AZLE_RECORD_BENCHMARKS ?? 'false';
    const fuzz = process.env.AZLE_FUZZ ?? 'false';
    const checkGlobalStateAfterFuzzTests =
        process.env.AZLE_CHECK_GLOBAL_STATE_AFTER_FUZZ_TESTS ?? 'true';

    const hasOnly = [
        runTests,
        runTypeChecks,
        fuzz,
        checkGlobalStateAfterTests,
        checkMemoryStateAfterTests,
        checkGlobalStateAfterFuzzTests
    ].includes('only');

    const shouldRunTests = shouldRun(runTests, hasOnly, true);
    const shouldCheckGlobalStateAfterTests = shouldRun(
        checkGlobalStateAfterTests,
        hasOnly,
        true
    );
    const shouldCheckMemoryStateAfterTests = shouldRun(
        checkMemoryStateAfterTests,
        hasOnly,
        true
    );
    const shouldRunTypeChecks = shouldRun(runTypeChecks, hasOnly, true);
    const shouldRecordBenchmarks = recordBenchmarks === 'true' && !hasOnly;
    const cuzzConfig = getCuzzConfig();
    const shouldFuzz =
        cuzzConfig.skip !== true &&
        typeof cuzzConfig.skip !== 'string' &&
        shouldRun(fuzz, hasOnly, false);
    const shouldCheckGlobalStateAfterFuzzTests =
        shouldFuzz === true &&
        shouldRun(checkGlobalStateAfterFuzzTests, hasOnly, true);

    return {
        shouldRunTests,
        shouldRunTypeChecks,
        shouldRecordBenchmarks,
        shouldFuzz,
        shouldCheckGlobalStateAfterTests,
        shouldCheckMemoryStateAfterTests,
        shouldCheckGlobalStateAfterFuzzTests
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

function isExpectedError(error: Error, expectedErrors: string[]): boolean {
    return expectedErrors.some((expected) => {
        const regex = new RegExp(expected);
        return regex.test(error.message) || regex.test(error.toString());
    });
}
