import * as dns from 'node:dns';
dns.setDefaultResultOrder('ipv4first');

import { describe, expect, test } from '@jest/globals';

import { execSyncPretty } from '#utils/exec_sync_pretty';

export { expect } from '@jest/globals';

import { execSync } from 'node:child_process';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

import { DfxJson } from '#utils/types';

import { runBenchmarksForCanisters } from './benchmarks';
import { runFuzzTests } from './fuzz';

export type Test = () => void;

export { getCanisterActor } from './get_canister_actor';
export { defaultPropTestParams } from '#test/property/default_prop_test_params';

export function runTests(tests: Test): void {
    const {
        shouldRunTests,
        shouldRunTypeChecks,
        shouldRecordBenchmarks,
        shouldFuzz,
        shouldCheckGlobalState
    } = processEnvVars();

    if (shouldRunTests === true) {
        describe(`tests`, tests);
    }

    if (shouldRunTypeChecks === true) {
        describe(`type checks`, () => {
            it('checks types', async () => {
                const typeCheckCommand = `npm exec --offline tsc -- --skipLibCheck`; // TODO: remove skipLibCheck once https://github.com/demergent-labs/azle/issues/2690 is resolved
                try {
                    execSyncPretty(typeCheckCommand, 'inherit');
                } catch {
                    expect('Type checking failed').toBe(
                        'Type checking to pass'
                    );
                }
            });
        });
    }

    if (shouldCheckGlobalState === true) {
        describe(`global state checks`, () => {
            it('checks that the _azle global state variables are empty, and optionally that actions are not growing', async () => {
                const canisterNames = await getCanisterNames();

                for (const canisterName of canisterNames) {
                    const azleRejectCallbacksLen = execSync(
                        `dfx canister call ${canisterName} _azle_reject_callbacks_len --output json`
                    ).toString();

                    expect(Number(azleRejectCallbacksLen)).toEqual(0);

                    const azleResolveCallbacksLen = execSync(
                        `dfx canister call ${canisterName} _azle_resolve_callbacks_len --output json`
                    ).toString();

                    expect(Number(azleResolveCallbacksLen)).toEqual(0);

                    const azleTimerCallbacksLen = execSync(
                        `dfx canister call ${canisterName} _azle_timer_callbacks_len --output json`
                    ).toString();

                    expect(Number(azleTimerCallbacksLen)).toEqual(0);

                    const azleActionsLen0 = execSync(
                        `dfx canister call ${canisterName} _azle_actions_len --output json`
                    ).toString();

                    await new Promise((resolve) => setTimeout(resolve, 2_000));

                    const azleActionsLen1 = execSync(
                        `dfx canister call ${canisterName} _azle_actions_len --output json`
                    ).toString();

                    await new Promise((resolve) => setTimeout(resolve, 2_000));

                    const azleActionsLen2 = execSync(
                        `dfx canister call ${canisterName} _azle_actions_len --output json`
                    ).toString();

                    expect(azleActionsLen0).toEqual(azleActionsLen1);
                    expect(azleActionsLen0).toEqual(azleActionsLen2);

                    console.info(
                        'azleRejectCallbacksLen',
                        azleRejectCallbacksLen
                    );

                    console.info(
                        'azleResolveCallbacksLen',
                        azleResolveCallbacksLen
                    );

                    console.info(
                        'azleTimerCallbacksLen',
                        azleTimerCallbacksLen
                    );

                    console.info('azleActionsLen0', azleActionsLen0);
                    console.info('azleActionsLen1', azleActionsLen1);
                    console.info('azleActionsLen2', azleActionsLen2);
                }
            });
        });
    }

    if (shouldRecordBenchmarks === true) {
        describe(`benchmarks`, () => {
            it('runs benchmarks for all canisters', async () => {
                const canisterNames = await getCanisterNames();
                runBenchmarksForCanisters(canisterNames);
            });
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

function processEnvVars(): {
    shouldRunTests: boolean;
    shouldRunTypeChecks: boolean;
    shouldRecordBenchmarks: boolean;
    shouldFuzz: boolean;
    shouldCheckGlobalState: boolean;
} {
    const runTests = process.env.AZLE_RUN_TESTS ?? 'true';
    const runTypeChecks = process.env.AZLE_RUN_TYPE_CHECKS ?? 'true';
    const recordBenchmarks = process.env.AZLE_RECORD_BENCHMARKS ?? 'false';
    const fuzz = process.env.AZLE_FUZZ ?? 'false';
    const checkGlobalState = process.env.AZLE_CHECK_GLOBAL_STATE ?? 'true';

    const hasOnly = [runTests, runTypeChecks, fuzz, checkGlobalState].includes(
        'only'
    );

    return {
        shouldRunTests: shouldRun(runTests, hasOnly, true),
        shouldRunTypeChecks: shouldRun(runTypeChecks, hasOnly, true),
        shouldRecordBenchmarks: recordBenchmarks === 'true' && !hasOnly,
        shouldFuzz: shouldRun(fuzz, hasOnly, false),
        shouldCheckGlobalState: shouldRun(checkGlobalState, hasOnly, true)
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
    const dfxFile = await readFile(join(process.cwd(), 'dfx.json'), 'utf-8');

    return JSON.parse(dfxFile);
}
