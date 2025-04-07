import * as dns from 'node:dns';
dns.setDefaultResultOrder('ipv4first');

import { describe, expect, test } from '@jest/globals';

import { execSyncPretty } from '#utils/exec_sync_pretty';

export { expect } from '@jest/globals';

import { execSync } from 'node:child_process';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

import { getDfxRoot } from '#utils/global_paths';
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

    if (shouldCheckGlobalState === true) {
        describe(`global state checks`, () => {
            it('checks that the _azle global state variables are empty, and optionally that actions are not growing', async () => {
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

                    console.info(
                        'azleRejectCallbacksLen0',
                        azleRejectCallbacksLen0
                    );
                    console.info(
                        'azleResolveCallbacksLen0',
                        azleResolveCallbacksLen0
                    );
                    console.info(
                        'azleTimerCallbacksLen0',
                        azleTimerCallbacksLen0
                    );
                    console.info('azleActionsLen0', azleActionsLen0);

                    console.info(
                        'azleRejectCallbacksLen1',
                        azleRejectCallbacksLen1
                    );
                    console.info(
                        'azleResolveCallbacksLen1',
                        azleResolveCallbacksLen1
                    );
                    console.info(
                        'azleTimerCallbacksLen1',
                        azleTimerCallbacksLen1
                    );
                    console.info('azleActionsLen1', azleActionsLen1);

                    console.info(
                        'azleRejectCallbacksLen2',
                        azleRejectCallbacksLen2
                    );
                    console.info(
                        'azleResolveCallbacksLen2',
                        azleResolveCallbacksLen2
                    );
                    console.info(
                        'azleTimerCallbacksLen2',
                        azleTimerCallbacksLen2
                    );
                    console.info('azleActionsLen2', azleActionsLen2);

                    expect(azleRejectCallbacksLen0).toEqual(0);
                    expect(azleResolveCallbacksLen0).toEqual(0);
                    expect(azleTimerCallbacksLen0).toEqual(0);

                    expect(azleRejectCallbacksLen1).toEqual(0);
                    expect(azleResolveCallbacksLen1).toEqual(0);
                    expect(azleTimerCallbacksLen1).toEqual(0);
                    expect(azleActionsLen0).toEqual(azleActionsLen1);

                    expect(azleRejectCallbacksLen2).toEqual(0);
                    expect(azleResolveCallbacksLen2).toEqual(0);
                    expect(azleTimerCallbacksLen2).toEqual(0);
                    expect(azleActionsLen0).toEqual(azleActionsLen2);
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
    const dfxFile = await readFile(join(getDfxRoot(), 'dfx.json'), 'utf-8');

    return JSON.parse(dfxFile);
}
