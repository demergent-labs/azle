import * as dns from 'node:dns';
dns.setDefaultResultOrder('ipv4first');

import { describe, expect, test } from '@jest/globals';

import { execSyncPretty } from '#utils/exec_sync_pretty';

export { expect } from '@jest/globals';

import { execSync } from 'node:child_process';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

import { getDfxRoot } from '#utils/dfx_root';
import { DfxJson } from '#utils/types';

import { runBenchmarksForCanisters } from './benchmarks';
import { getCuzzConfig, runFuzzTests } from './fuzz';

export type Test = () => void;

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
        describe(`tests`, tests);
    }

    if (shouldCheckGlobalStateAfterTests === true) {
        describe(`global state checks after tests`, () => {
            it(
                'checks that the _azle global state variables are empty, and optionally that actions are not growing',
                runGlobalStateChecks
            );
        });
    }

    if (shouldRunTypeChecks === true) {
        describe(`type checks`, () => {
            it('checks types', async () => {
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
        });
    }

    if (shouldRecordBenchmarks === true) {
        describe(`benchmarks`, () => {
            it('runs benchmarks for all canisters', async () => {
                const canisterNames = await getCanisterNames();
                await runBenchmarksForCanisters(canisterNames);
            });
        });
    }

    if (shouldFuzz === true) {
        describe(`fuzz`, () => {
            it('runs fuzz tests for all canisters', runFuzzTests);
        });
    }

    if (shouldCheckGlobalStateAfterFuzzTests === true) {
        describe(`global state checks after fuzz tests`, () => {
            please('wait for dfx to be healthy', async () => {
                while (true) {
                    try {
                        execSync(`dfx ping --wait-healthy`, {
                            cwd: getDfxRoot(),
                            encoding: 'utf-8'
                        });
                        break;
                    } catch {
                        console.info(
                            'dfx ping --wait-healthy failed, retrying in 1 second...'
                        );
                        await new Promise((resolve) =>
                            setTimeout(resolve, 1_000)
                        );
                    }
                }
            });

            wait(
                'for fuzz tests to settle before checking global state',
                60_000
            );

            it(
                'checks that the _azle global state variables are empty, and optionally that actions are not growing',
                runGlobalStateChecks
            );
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
        const azleRejectCallbacksLen0 = Number(
            execSync(
                `dfx canister call ${canisterName} _azle_reject_callbacks_len --output json`,
                {
                    cwd: getDfxRoot(),
                    encoding: 'utf-8'
                }
            )
        );
        const azleResolveCallbacksLen0 = Number(
            execSync(
                `dfx canister call ${canisterName} _azle_resolve_callbacks_len --output json`,
                {
                    cwd: getDfxRoot(),
                    encoding: 'utf-8'
                }
            )
        );
        const azleTimerCallbacksLen0 = Number(
            execSync(
                `dfx canister call ${canisterName} _azle_timer_callbacks_len --output json`,
                {
                    cwd: getDfxRoot(),
                    encoding: 'utf-8'
                }
            )
        );
        const azleActionsLen0 = Number(
            execSync(
                `dfx canister call ${canisterName} _azle_actions_len --output json`,
                {
                    cwd: getDfxRoot(),
                    encoding: 'utf-8'
                }
            )
        );
        const azleInterCanisterCallFuturesLen0 = Number(
            execSync(
                `dfx canister call ${canisterName} _azle_inter_canister_call_futures_len --output json`,
                {
                    cwd: getDfxRoot(),
                    encoding: 'utf-8'
                }
            )
        );
        const azleIsJobQueueEmpty0 = JSON.parse(
            execSync(
                `dfx canister call ${canisterName} _azle_is_job_queue_empty --output json`,
                { cwd: getDfxRoot(), encoding: 'utf-8' }
            ).trim()
        ) as boolean;

        await new Promise((resolve) => setTimeout(resolve, 2_000));

        const azleRejectCallbacksLen1 = Number(
            execSync(
                `dfx canister call ${canisterName} _azle_reject_callbacks_len --output json`,
                {
                    cwd: getDfxRoot(),
                    encoding: 'utf-8'
                }
            )
        );
        const azleResolveCallbacksLen1 = Number(
            execSync(
                `dfx canister call ${canisterName} _azle_resolve_callbacks_len --output json`,
                {
                    cwd: getDfxRoot(),
                    encoding: 'utf-8'
                }
            )
        );
        const azleTimerCallbacksLen1 = Number(
            execSync(
                `dfx canister call ${canisterName} _azle_timer_callbacks_len --output json`,
                {
                    cwd: getDfxRoot(),
                    encoding: 'utf-8'
                }
            )
        );
        const azleActionsLen1 = Number(
            execSync(
                `dfx canister call ${canisterName} _azle_actions_len --output json`,
                {
                    cwd: getDfxRoot(),
                    encoding: 'utf-8'
                }
            )
        );
        const azleInterCanisterCallFuturesLen1 = Number(
            execSync(
                `dfx canister call ${canisterName} _azle_inter_canister_call_futures_len --output json`,
                {
                    cwd: getDfxRoot(),
                    encoding: 'utf-8'
                }
            )
        );
        const azleIsJobQueueEmpty1 = JSON.parse(
            execSync(
                `dfx canister call ${canisterName} _azle_is_job_queue_empty --output json`,
                { cwd: getDfxRoot(), encoding: 'utf-8' }
            ).trim()
        ) as boolean;

        await new Promise((resolve) => setTimeout(resolve, 2_000));

        const azleRejectCallbacksLen2 = Number(
            execSync(
                `dfx canister call ${canisterName} _azle_reject_callbacks_len --output json`,
                {
                    cwd: getDfxRoot(),
                    encoding: 'utf-8'
                }
            )
        );
        const azleResolveCallbacksLen2 = Number(
            execSync(
                `dfx canister call ${canisterName} _azle_resolve_callbacks_len --output json`,
                {
                    cwd: getDfxRoot(),
                    encoding: 'utf-8'
                }
            )
        );
        const azleTimerCallbacksLen2 = Number(
            execSync(
                `dfx canister call ${canisterName} _azle_timer_callbacks_len --output json`,
                {
                    cwd: getDfxRoot(),
                    encoding: 'utf-8'
                }
            )
        );
        const azleActionsLen2 = Number(
            execSync(
                `dfx canister call ${canisterName} _azle_actions_len --output json`,
                {
                    cwd: getDfxRoot(),
                    encoding: 'utf-8'
                }
            )
        );
        const azleInterCanisterCallFuturesLen2 = Number(
            execSync(
                `dfx canister call ${canisterName} _azle_inter_canister_call_futures_len --output json`,
                {
                    cwd: getDfxRoot(),
                    encoding: 'utf-8'
                }
            )
        );
        const azleIsJobQueueEmpty2 = JSON.parse(
            execSync(
                `dfx canister call ${canisterName} _azle_is_job_queue_empty --output json`,
                { cwd: getDfxRoot(), encoding: 'utf-8' }
            ).trim()
        ) as boolean;

        console.info('azleRejectCallbacksLen0', azleRejectCallbacksLen0);
        console.info('azleResolveCallbacksLen0', azleResolveCallbacksLen0);
        console.info('azleTimerCallbacksLen0', azleTimerCallbacksLen0);
        console.info('azleActionsLen0', azleActionsLen0);
        console.info(
            'azleInterCanisterCallFuturesLen0',
            azleInterCanisterCallFuturesLen0
        );
        console.info('azleIsJobQueueEmpty0', azleIsJobQueueEmpty0);

        console.info('azleRejectCallbacksLen1', azleRejectCallbacksLen1);
        console.info('azleResolveCallbacksLen1', azleResolveCallbacksLen1);
        console.info('azleTimerCallbacksLen1', azleTimerCallbacksLen1);
        console.info('azleActionsLen1', azleActionsLen1);
        console.info(
            'azleInterCanisterCallFuturesLen1',
            azleInterCanisterCallFuturesLen1
        );
        console.info('azleIsJobQueueEmpty1', azleIsJobQueueEmpty1);

        console.info('azleRejectCallbacksLen2', azleRejectCallbacksLen2);
        console.info('azleResolveCallbacksLen2', azleResolveCallbacksLen2);
        console.info('azleTimerCallbacksLen2', azleTimerCallbacksLen2);
        console.info('azleActionsLen2', azleActionsLen2);
        console.info(
            'azleInterCanisterCallFuturesLen2',
            azleInterCanisterCallFuturesLen2
        );
        console.info('azleIsJobQueueEmpty2', azleIsJobQueueEmpty2);

        expect(azleRejectCallbacksLen0).toEqual(0);
        expect(azleResolveCallbacksLen0).toEqual(0);
        expect(azleTimerCallbacksLen0).toEqual(0);
        expect(azleInterCanisterCallFuturesLen0).toEqual(0);
        expect(azleIsJobQueueEmpty0).toBe(true);

        expect(azleRejectCallbacksLen1).toEqual(0);
        expect(azleResolveCallbacksLen1).toEqual(0);
        expect(azleTimerCallbacksLen1).toEqual(0);
        expect(azleActionsLen0).toEqual(azleActionsLen1);
        expect(azleInterCanisterCallFuturesLen1).toEqual(0);
        expect(azleIsJobQueueEmpty1).toBe(true);

        expect(azleRejectCallbacksLen2).toEqual(0);
        expect(azleResolveCallbacksLen2).toEqual(0);
        expect(azleTimerCallbacksLen2).toEqual(0);
        expect(azleActionsLen0).toEqual(azleActionsLen2);
        expect(azleInterCanisterCallFuturesLen2).toEqual(0);
        expect(azleIsJobQueueEmpty2).toBe(true);
    }
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
