import * as dns from 'node:dns';
dns.setDefaultResultOrder('ipv4first');

import { describe, expect, test } from '@jest/globals';
import {
    DEFAULT_EXPECTED_ERRORS,
    formatMemorySize,
    getRawMemorySize
} from 'cuzz';

import { execSyncPretty } from '#utils/exec_sync_pretty';

export { expect } from '@jest/globals';

import { execSync } from 'node:child_process';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

import { getDfxRoot } from '#utils/dfx_root';
import { DfxJson } from '#utils/types';

import { recordsBenchmarksForCanisters } from './benchmarks';
import { getCuzzConfig, runFuzzTests } from './fuzz';

export type Test = () => void;

type HeapAllocations = {
    [canisterName: string]: number | null;
};

type MemorySizes = {
    [canisterName: string]: number | null;
};

type MemoryState = {
    correctness: {
        heapAllocations: HeapAllocations;
        memorySizes: MemorySizes;
    };
    fuzz: {
        heapAllocations: HeapAllocations;
        memorySizes: MemorySizes;
    };
};

let memoryState: MemoryState = {
    correctness: {
        heapAllocations: {},
        memorySizes: {}
    },
    fuzz: {
        heapAllocations: {},
        memorySizes: {}
    }
};

type GlobalState = {
    azleRejectCallbacksLen: number;
    azleResolveCallbacksLen: number;
    azleTimerCallbacksLen: number;
    azleInterCanisterCallFuturesLen: number;
    azleActionsLen: number;
    azleIsJobQueueEmpty: boolean;
};

export { getCanisterActor } from './get_canister_actor';
export { defaultPropTestParams } from '#test/property/default_prop_test_params';

export function runTests(tests: Test): void {
    const {
        shouldRunTests,
        shouldCheckGlobalStateAfterTests,
        shouldRunTypeChecks,
        shouldRecordBenchmarks,
        shouldFuzz,
        shouldCheckGlobalStateAfterFuzzTests
    } = processEnvVars();

    if (shouldRunTests === true) {
        describe(`correctness tests`, () => {
            please(
                'snapshot the canister memory size and heap allocation for all canisters before correctness tests',
                async () => {
                    const snapshot = await takeMemorySnapshot();

                    memoryState.correctness.heapAllocations =
                        snapshot.heapAllocations;
                    memoryState.correctness.memorySizes = snapshot.memorySizes;
                }
            );

            tests();

            if (shouldCheckGlobalStateAfterTests === true) {
                it(
                    'checks that all internal global state variables for all canisters are empty',
                    runGlobalStateChecks
                );
            }

            it('checks the canister memory size and heap allocation for all canisters after correctness tests', async () => {
                await checkMemoryChanges(
                    memoryState.correctness.heapAllocations,
                    memoryState.correctness.memorySizes
                );
            });

            if (shouldRunTypeChecks === true) {
                it('checks TypeScript types', async () => {
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
                });
            }
        });
    }

    if (shouldRecordBenchmarks === true) {
        describe(`benchmarks`, () => {
            it('records benchmarks for all canisters', async () => {
                const canisterNames = await getCanisterNames();
                await recordsBenchmarksForCanisters(canisterNames);
            });
        });
    }

    if (shouldFuzz === true) {
        describe('fuzz tests', () => {
            please(
                'snapshot the canister memory size and heap allocation for all canisters before fuzz tests',
                async () => {
                    const snapshot = await takeMemorySnapshot();
                    memoryState.fuzz.heapAllocations = snapshot.heapAllocations;
                    memoryState.fuzz.memorySizes = snapshot.memorySizes;
                }
            );

            it('runs fuzz tests', runFuzzTests);

            if (shouldCheckGlobalStateAfterFuzzTests === true) {
                it('checks that all internal global state variables for all canisters are empty', async () => {
                    while (true) {
                        try {
                            await runGlobalStateChecks();
                        } catch (error: any) {
                            if (
                                isExpectedError(
                                    error,
                                    DEFAULT_EXPECTED_ERRORS
                                ) === true
                            ) {
                                continue;
                            }

                            throw error;
                        }
                        break;
                    }
                });
            }

            it('checks the canister memory size and heap allocation for all canisters after fuzz tests', async () => {
                await checkMemoryChanges(
                    memoryState.fuzz.heapAllocations,
                    memoryState.fuzz.memorySizes
                );
            });
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

async function runGlobalStateChecks(): Promise<void> {
    const canisterNames = await getCanisterNames();

    for (const canisterName of canisterNames) {
        await checkCanisterGlobalStateWithRetry(canisterName);
    }
}

async function checkCanisterGlobalStateWithRetry(
    canisterName: string
): Promise<void> {
    const maxWaitTimePower = 8; // 2^8 = 256 seconds

    const { finalGlobalState, previousActionsLen } =
        await checkCanisterGlobalStateRecursively(
            canisterName,
            {
                checkCount: 0,
                currentWaitTimePower: 0,
                totalWaitTime: 0,
                previousActionsLen: undefined
            },
            maxWaitTimePower
        );

    performFinalAssertions(finalGlobalState, previousActionsLen);
}

async function checkCanisterGlobalStateRecursively(
    canisterName: string,
    state: {
        checkCount: number;
        currentWaitTimePower: number;
        totalWaitTime: number;
        previousActionsLen: number | undefined;
    },
    maxWaitTimePower: number
): Promise<{
    finalGlobalState: GlobalState;
    previousActionsLen: number | undefined;
}> {
    console.info(
        `Global state check ${state.checkCount} for canister ${canisterName}`
    );

    const globalState = await getCanisterGlobalState(canisterName);

    console.info(`Check ${state.checkCount} results:`, globalState);

    const criticalStatesClear = areCriticalStatesClear(
        globalState,
        state.previousActionsLen
    );

    if (criticalStatesClear === true && state.checkCount >= 2) {
        return {
            finalGlobalState: globalState,
            previousActionsLen: state.previousActionsLen
        };
    }

    const hasReachedMaxWaitTime =
        state.currentWaitTimePower >= maxWaitTimePower;

    if (hasReachedMaxWaitTime === true) {
        return {
            finalGlobalState: globalState,
            previousActionsLen: state.previousActionsLen
        };
    }

    const currentWaitTimeMs = Math.pow(2, state.currentWaitTimePower) * 1_000;

    console.info(
        `Waiting ${currentWaitTimeMs}ms (2^${state.currentWaitTimePower} seconds) before next check (total wait: ${state.totalWaitTime}ms)`
    );

    await new Promise((resolve) => setTimeout(resolve, currentWaitTimeMs));

    const nextState = {
        checkCount: state.checkCount + 1,
        currentWaitTimePower: state.currentWaitTimePower + 1,
        totalWaitTime: state.totalWaitTime + currentWaitTimeMs,
        previousActionsLen: globalState.azleActionsLen
    };

    return checkCanisterGlobalStateRecursively(
        canisterName,
        nextState,
        maxWaitTimePower
    );
}

async function getCanisterGlobalState(
    canisterName: string
): Promise<GlobalState> {
    const azleRejectCallbacksLen = Number(
        execSync(
            `dfx canister call ${canisterName} _azle_reject_callbacks_len --output json`,
            {
                cwd: getDfxRoot(),
                encoding: 'utf-8'
            }
        )
    );
    const azleResolveCallbacksLen = Number(
        execSync(
            `dfx canister call ${canisterName} _azle_resolve_callbacks_len --output json`,
            {
                cwd: getDfxRoot(),
                encoding: 'utf-8'
            }
        )
    );
    const azleTimerCallbacksLen = Number(
        execSync(
            `dfx canister call ${canisterName} _azle_timer_callbacks_len --output json`,
            {
                cwd: getDfxRoot(),
                encoding: 'utf-8'
            }
        )
    );
    const azleInterCanisterCallFuturesLen = Number(
        execSync(
            `dfx canister call ${canisterName} _azle_inter_canister_call_futures_len --output json`,
            {
                cwd: getDfxRoot(),
                encoding: 'utf-8'
            }
        )
    );
    const azleActionsLen = Number(
        execSync(
            `dfx canister call ${canisterName} _azle_actions_len --output json`,
            {
                cwd: getDfxRoot(),
                encoding: 'utf-8'
            }
        )
    );
    const azleIsJobQueueEmpty = JSON.parse(
        execSync(
            `dfx canister call ${canisterName} _azle_is_job_queue_empty --output json`,
            { cwd: getDfxRoot(), encoding: 'utf-8' }
        ).trim()
    ) as boolean;

    return {
        azleRejectCallbacksLen,
        azleResolveCallbacksLen,
        azleTimerCallbacksLen,
        azleInterCanisterCallFuturesLen,
        azleActionsLen,
        azleIsJobQueueEmpty
    };
}

function areCriticalStatesClear(
    globalState: GlobalState,
    previousActionsLen: number | undefined
): boolean {
    const globalActionsLengthUnchanged =
        previousActionsLen === undefined ||
        globalState.azleActionsLen === previousActionsLen;

    return (
        globalState.azleRejectCallbacksLen === 0 &&
        globalState.azleResolveCallbacksLen === 0 &&
        globalState.azleTimerCallbacksLen === 0 &&
        globalState.azleInterCanisterCallFuturesLen === 0 &&
        globalState.azleIsJobQueueEmpty === true &&
        globalActionsLengthUnchanged === true
    );
}

function performFinalAssertions(
    globalState: GlobalState,
    previousActionsLen: number | undefined
): void {
    const globalActionsLengthUnchanged =
        previousActionsLen === undefined ||
        globalState.azleActionsLen === previousActionsLen;

    expect(globalState.azleRejectCallbacksLen).toEqual(0);
    expect(globalState.azleResolveCallbacksLen).toEqual(0);
    expect(globalState.azleTimerCallbacksLen).toEqual(0);
    expect(globalState.azleInterCanisterCallFuturesLen).toEqual(0);
    expect(globalState.azleIsJobQueueEmpty).toBe(true);
    expect(globalActionsLengthUnchanged).toEqual(true);
}

function processEnvVars(): {
    shouldRunTests: boolean;
    shouldCheckGlobalStateAfterTests: boolean;
    shouldRunTypeChecks: boolean;
    shouldRecordBenchmarks: boolean;
    shouldFuzz: boolean;
    shouldCheckGlobalStateAfterFuzzTests: boolean;
} {
    const runTests = process.env.AZLE_RUN_TESTS ?? 'true';
    const checkGlobalStateAfterTests =
        process.env.AZLE_CHECK_GLOBAL_STATE_AFTER_TESTS ?? 'true';
    const runTypeChecks = process.env.AZLE_RUN_TYPE_CHECKS ?? 'true';
    const recordBenchmarks = process.env.AZLE_RECORD_BENCHMARKS ?? 'false';
    const fuzz = process.env.AZLE_FUZZ ?? 'false';
    const cuzzConfig = getCuzzConfig();
    const checkGlobalStateAfterFuzzTests =
        process.env.AZLE_CHECK_GLOBAL_STATE_AFTER_FUZZ_TESTS ?? 'true';

    const hasOnly = [
        runTests,
        runTypeChecks,
        fuzz,
        checkGlobalStateAfterTests,
        checkGlobalStateAfterFuzzTests
    ].includes('only');

    const shouldRunTests = shouldRun(runTests, hasOnly, true);
    const shouldCheckGlobalStateAfterTests = shouldRun(
        checkGlobalStateAfterTests,
        hasOnly,
        true
    );
    const shouldRunTypeChecks = shouldRun(runTypeChecks, hasOnly, true);
    const shouldRecordBenchmarks = recordBenchmarks === 'true' && !hasOnly;
    const shouldFuzz =
        cuzzConfig.skip !== true && shouldRun(fuzz, hasOnly, false);
    const shouldCheckGlobalStateAfterFuzzTests =
        shouldFuzz === true &&
        shouldRun(checkGlobalStateAfterFuzzTests, hasOnly, true);

    return {
        shouldRunTests,
        shouldRunTypeChecks,
        shouldRecordBenchmarks,
        shouldFuzz,
        shouldCheckGlobalStateAfterTests,
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

export async function getCanisterNames(
    onlyAzle: boolean = true
): Promise<string[]> {
    const dfxJson = await getDfxJson();

    if (dfxJson.canisters === undefined) {
        throw new Error('No canisters found in dfx.json');
    }

    return Object.entries(dfxJson.canisters)
        .filter(([_, value]) => {
            if (onlyAzle === false) {
                return true;
            }

            return value?.type === 'azle';
        })
        .map(([key, _]) => key);
}

async function getDfxJson(): Promise<DfxJson> {
    const dfxFile = await readFile(join(getDfxRoot(), 'dfx.json'), 'utf-8');

    return JSON.parse(dfxFile);
}

function isExpectedError(error: Error, expectedErrors: string[]): boolean {
    return expectedErrors.some((expected) => {
        const regex = new RegExp(expected);
        return regex.test(error.message) || regex.test(error.toString());
    });
}

async function takeMemorySnapshot(): Promise<{
    heapAllocations: HeapAllocations;
    memorySizes: MemorySizes;
}> {
    const canisterNames = await getCanisterNames();

    const canisterSnapshots = await Promise.all(
        canisterNames.map(async (canisterName) => {
            const memorySize = await getRawMemorySize(canisterName);

            console.info(
                `Canister ${canisterName} memory size: ${formatMemorySize(memorySize)}`
            );

            const heapAllocation = getHeapAllocation(canisterName);

            console.info(
                `Canister ${canisterName} heap allocation: ${formatMemorySize(heapAllocation)}`
            );

            return {
                canisterName,
                heapAllocation,
                memorySize
            };
        })
    );

    const heapAllocations = canisterSnapshots.reduce<HeapAllocations>(
        (acc, { canisterName, heapAllocation }) => ({
            ...acc,
            [canisterName]: heapAllocation
        }),
        {}
    );

    const memorySizes = canisterSnapshots.reduce<MemorySizes>(
        (acc, { canisterName, memorySize }) => ({
            ...acc,
            [canisterName]: memorySize
        }),
        {}
    );

    return { heapAllocations, memorySizes };
}

async function checkMemoryChanges(
    startingHeapAllocations: HeapAllocations,
    startingMemorySizes: MemorySizes
): Promise<void> {
    const cuzzConfig = getCuzzConfig();
    const canisterNames = await getCanisterNames();

    for (const canisterName of canisterNames) {
        const finalMemorySize = await getRawMemorySize(canisterName);
        const startingMemorySize = startingMemorySizes[canisterName];

        const finalHeapAllocation = getHeapAllocation(canisterName);
        const startingHeapAllocation = startingHeapAllocations[canisterName];

        if (startingMemorySize === null || startingMemorySize === undefined) {
            console.info(
                `Canister ${canisterName} final memory size: ${formatMemorySize(finalMemorySize)} (starting size unknown)`
            );
        } else {
            const memoryIncrease =
                finalMemorySize === null
                    ? null
                    : finalMemorySize - startingMemorySize;
            const increaseText =
                memoryIncrease === null
                    ? 'unknown'
                    : memoryIncrease === 0
                      ? 'no change'
                      : memoryIncrease > 0
                        ? `+${formatMemorySize(memoryIncrease)}`
                        : `-${formatMemorySize(memoryIncrease)}`;

            console.info(
                `Canister ${canisterName} final memory size: ${formatMemorySize(finalMemorySize)} (${increaseText})`
            );
        }

        if (
            startingHeapAllocation === null ||
            startingHeapAllocation === undefined
        ) {
            console.info(
                `Canister ${canisterName} final heap allocation: ${formatMemorySize(finalHeapAllocation)} (starting size unknown)`
            );
        } else {
            const heapAllocationIncrease =
                finalHeapAllocation - startingHeapAllocation;
            const increaseText =
                heapAllocationIncrease === 0
                    ? 'no change'
                    : heapAllocationIncrease > 0
                      ? `+${formatMemorySize(heapAllocationIncrease)}`
                      : `-${formatMemorySize(heapAllocationIncrease)}`;

            console.info(
                `Canister ${canisterName} final heap allocation: ${formatMemorySize(finalHeapAllocation)} (${increaseText})`
            );
        }

        const memoryIncrease =
            finalMemorySize === null || startingMemorySize === null
                ? null
                : finalMemorySize - startingMemorySize;

        // TODO we really need to be able to set the memoryIncreaseExpected per canister right?
        // TODO maybe this should be done in the dfx.json custom section per canister?
        // TODO I don't even think cuzz does anything with this memoryIncreaseExpected
        if (cuzzConfig.memoryIncreaseExpected !== true) {
            expect(memoryIncrease).not.toBeNull();
            expect(memoryIncrease).toBe(0);
        }

        const heapAllocationIncrease =
            startingHeapAllocation === null
                ? null
                : finalHeapAllocation - startingHeapAllocation;

        expect(heapAllocationIncrease).not.toBeNull();
        expect(heapAllocationIncrease).toBeLessThanOrEqual(100_000);
    }
}

function getHeapAllocation(canisterName: string): number {
    return Number(
        execSync(
            `dfx canister call ${canisterName} _azle_heap_current_allocation --output json`,
            {
                cwd: getDfxRoot(),
                encoding: 'utf-8'
            }
        )
    );
}
