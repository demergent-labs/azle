import * as dns from 'node:dns';
dns.setDefaultResultOrder('ipv4first');

import { describe, expect, test } from '@jest/globals';

import { execSyncPretty } from '#utils/exec_sync_pretty';

export { expect } from '@jest/globals';

import { execSync } from 'node:child_process';

import { runBenchmarksForCanisters } from './benchmarks';
import { runFuzzTests } from './fuzz';

export type Test = () => void;

export { getCanisterActor } from './get_canister_actor';
export { defaultPropTestParams } from '#test/property/default_prop_test_params';

export function runTests(
    tests: Test,
    canisterNames: string | string[] | undefined = undefined,
    _cwd: string = process.cwd()
): void {
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

    // TODO is there a better way to get the canister name?
    // TODO get it from the dfx.json...but we should only do it for azle canisters right?
    if (shouldCheckGlobalState === true) {
        describe(`global state checks`, () => {
            it('checks that the _azle global state variables are empty, and optionally that actions are not growing', async () => {
                for (const _canisterName of canisterNames ?? []) {
                    const azleRejectCallbacksLen = execSync(
                        `dfx canister call timers _azle_reject_callbacks_len --output json`
                    ).toString();

                    console.log(
                        'azleRejectCallbacksLen',
                        azleRejectCallbacksLen
                    );

                    expect(Number(azleRejectCallbacksLen)).toEqual(0);

                    const azleResolveCallbacksLen = execSync(
                        `dfx canister call timers _azle_resolve_callbacks_len --output json`
                    ).toString();

                    console.log(
                        'azleResolveCallbacksLen',
                        azleResolveCallbacksLen
                    );

                    expect(Number(azleResolveCallbacksLen)).toEqual(0);

                    const azleTimerCallbacksLen = execSync(
                        `dfx canister call timers _azle_timer_callbacks_len --output json`
                    ).toString();

                    console.log('azleTimerCallbacksLen', azleTimerCallbacksLen);

                    expect(Number(azleTimerCallbacksLen)).toEqual(0);

                    const azleActionsLen0 = execSync(
                        `dfx canister call timers _azle_actions_len --output json`
                    ).toString();

                    console.log('azleActionsLen0', azleActionsLen0);

                    await new Promise((resolve) => setTimeout(resolve, 2_000));

                    const azleActionsLen1 = execSync(
                        `dfx canister call timers _azle_actions_len --output json`
                    ).toString();

                    console.log('azleActionsLen1', azleActionsLen1);

                    await new Promise((resolve) => setTimeout(resolve, 2_000));

                    const azleActionsLen2 = execSync(
                        `dfx canister call timers _azle_actions_len --output json`
                    ).toString();

                    console.log('azleActionsLen2', azleActionsLen2);

                    expect(azleActionsLen0).toEqual(azleActionsLen1);
                    expect(azleActionsLen0).toEqual(azleActionsLen2);
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
