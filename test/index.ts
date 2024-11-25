import * as dns from 'node:dns';
dns.setDefaultResultOrder('ipv4first');

import { ActorSubclass, HttpAgent } from '@dfinity/agent';
import { describe, expect, test } from '@jest/globals';
import { spawn } from 'child_process';
import * as fc from 'fast-check';
import { readFileSync } from 'fs';
import { join } from 'path';

import { getCanisterId } from '../dfx';
import { execSyncPretty } from '../src/build/stable/utils/exec_sync_pretty';
export { expect } from '@jest/globals';
import { runBenchmarksForCanisters } from './benchmarks';

export type Test = () => void;

export function runTests(
    tests: Test,
    canisterNames: string | string[] | undefined = undefined,
    cwd: string = process.cwd()
): void {
    const {
        shouldRunTests,
        shouldRunTypeChecks,
        shouldRecordBenchmarks,
        shouldFuzz
    } = processEnvVars();

    if (shouldRunTests) {
        describe(`tests`, tests);
    }

    if (shouldRunTypeChecks) {
        describe(`type checks`, () => {
            it('checks types', () => {
                try {
                    execSyncPretty(
                        `${join(
                            cwd,
                            'node_modules',
                            '.bin',
                            'tsc'
                        )} --noEmit --skipLibCheck --target es2020 --strict --moduleResolution node --allowJs`,
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

    if (shouldRecordBenchmarks && canisterNames !== undefined) {
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
            it('runs fuzz tests for all canisters', () => {
                // execSyncPretty(`cuzz`, 'inherit');
                const dfxFile = readFileSync(
                    join(process.cwd(), 'dfx.json'),
                    'utf-8'
                );
                console.log(dfxFile);

                const cuzzJson = ((): any => {
                    try {
                        const cuzzFile = readFileSync(
                            join(process.cwd(), 'cuzz.json'),
                            'utf-8'
                        );
                        return JSON.parse(cuzzFile);
                    } catch {
                        return {};
                    }
                })();

                const dfxJson = JSON.parse(dfxFile);

                console.log(dfxJson);
                console.log(cuzzJson.callDelay);

                const canisterNames = Object.keys(dfxJson.canisters);
                console.log('Canister names:', canisterNames);

                const callDelay =
                    process.env.AZLE_FUZZ_CALL_DELAY ??
                    cuzzJson.callDelay?.toString() ??
                    '.1'; // TODO let's think about the best default

                for (const canisterName of canisterNames) {
                    execSyncPretty(
                        `dfx ledger fabricate-cycles --canister ${canisterName} --cycles 1000000000000000000`,
                        'inherit'
                    );

                    // TODO spin out multiple actual GUI terminals if you can
                    console.log(`Starting cuzz for ${canisterName}`);

                    let cuzzProcess;

                    if (process.env.AZLE_FUZZ_TERMINALS === 'true') {
                        cuzzProcess = spawn(
                            'gnome-terminal',
                            [
                                '--',
                                'bash',
                                '-c',
                                `node_modules/.bin/cuzz --canister-name ${canisterName} --skip-deploy --call-delay ${callDelay} & exec bash`
                            ],
                            {
                                stdio: 'inherit'
                            }
                        );
                    } else {
                        cuzzProcess = spawn(
                            'node_modules/.bin/cuzz',
                            [
                                '--canister-name',
                                canisterName,
                                '--skip-deploy',
                                '--call-delay',
                                callDelay
                            ],
                            { stdio: 'inherit' }
                        );
                    }

                    cuzzProcess.on('exit', (code) => {
                        if (code !== 0) {
                            process.exit(code ?? 1);
                        }
                    });
                }
            });
        });
    }
}

export function wait(name: string, delay: number): void {
    test(
        `wait ${name}`,
        async () => {
            console.info(`Waiting: ${delay} milliseconds ${name}`);
            await new Promise((resolve) => {
                setTimeout(resolve, delay);
            });
        },
        delay + 1_000
    );
}

export function please(
    name: string,
    fn: () => void | Promise<void>,
    timeout?: number
): void {
    test(
        `please ${name}`,
        async () => {
            console.info(`Preparing: ${name}`);
            await fn();
        },
        timeout
    );
}
please.skip = test.skip;
please.only = test.only;

export function it(
    name: string,
    fn: () => void | Promise<void>,
    timeout?: number
): void {
    test(
        `it ${name}`,
        async () => {
            console.info(`Testing: ${name}`);
            await fn();
        },
        timeout
    );
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

export async function getCanisterActor<T>(
    canisterName: string
): Promise<ActorSubclass<T>> {
    const { createActor } = await import(
        join(process.cwd(), 'test', 'dfx_generated', canisterName)
    );

    const agent = new HttpAgent({
        host: 'http://127.0.0.1:8000'
    });

    await agent.fetchRootKey();

    const actor = createActor(getCanisterId(canisterName), {
        agent
    });

    return actor;
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
