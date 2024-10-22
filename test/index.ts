import * as dns from 'node:dns';
dns.setDefaultResultOrder('ipv4first');

import { ActorSubclass } from '@dfinity/agent';
import { describe, expect, test } from '@jest/globals';
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
    const { shouldRunTests, shouldRunTypeChecks, shouldRecordBenchmarks } =
        processEnvVars();

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

export const defaultPropTestParams = {
    numRuns: Number(process.env.AZLE_PROPTEST_NUM_RUNS ?? 1),
    endOnFailure: process.env.AZLE_PROPTEST_SHRINK === 'true' ? false : true
};

export async function getCanisterActor<T>(
    canisterName: string
): Promise<ActorSubclass<T>> {
    const { createActor } = await import(
        join(process.cwd(), 'test', 'dfx_generated', canisterName)
    );
    const actor = createActor(getCanisterId(canisterName), {
        agentOptions: {
            host: 'http://127.0.0.1:8000'
        }
    });

    return actor;
}

function processEnvVars(): {
    shouldRunTests: boolean;
    shouldRunTypeChecks: boolean;
    shouldRecordBenchmarks: boolean;
} {
    const runTests = process.env.AZLE_RUN_TESTS ?? 'true';
    const runTypeChecks = process.env.AZLE_RUN_TYPE_CHECKS ?? 'true';
    const recordBenchmarks = process.env.AZLE_RECORD_BENCHMARKS ?? 'true';

    const hasOnly = [runTests, runTypeChecks].includes('only');

    return {
        shouldRunTests: shouldRun(runTests, hasOnly),
        shouldRunTypeChecks: shouldRun(runTypeChecks, hasOnly),
        shouldRecordBenchmarks: recordBenchmarks === 'true'
    };
}

function shouldRun(envVar: string, hasOnly: boolean): boolean {
    return hasOnly ? envVar === 'only' : envVar !== 'false';
}
