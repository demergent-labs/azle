import * as dns from 'node:dns';
dns.setDefaultResultOrder('ipv4first');

import { describe, expect, test } from '@jest/globals';
import { execSync } from 'child_process';
import { join } from 'path';

import { execSyncPretty } from '../src/build/stable/utils/exec_sync_pretty';

export { expect } from '@jest/globals';
import { readFile } from 'fs/promises';

import { runBenchmarksForCanisters } from './benchmarks';
import { runFuzzTests } from './fuzz';

export type Test = () => void;

export { getCanisterActor } from './get_canister_actor';
export { defaultPropTestParams } from './property/default_prop_test_params';

export function runTests(
    tests: Test,
    canisterNames: string | string[] | undefined = undefined,
    _cwd: string = process.cwd()
): void {
    const {
        shouldRunTests,
        shouldRunTypeChecks,
        shouldRecordBenchmarks,
        shouldFuzz
    } = processEnvVars();

    describe('agent setup', () => {
        // TODO temporary fix for https://github.com/demergent-labs/azle/issues/2496
        wait('for root key to be fetched', 5_000);
    });

    if (shouldRunTests === true) {
        describe(`tests`, tests);
    }

    if (shouldRunTypeChecks === true) {
        describe(`type checks`, () => {
            it('checks types', async () => {
                const typeCheckCommand = `npm exec --offline tsc -- --noEmit --skipLibCheck`;
                await verifyTypeCheckCommand(typeCheckCommand);
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

async function verifyTypeCheckCommand(typeCheckCommand: string): Promise<void> {
    const configString = execSync(`${typeCheckCommand} --showConfig`, {
        encoding: 'utf8'
    });
    const configJson = JSON.parse(configString);
    const tsConfigPath = join(process.cwd(), 'tsconfig.json');
    const tsConfigJson = JSON.parse(await readFile(tsConfigPath, 'utf8'));
    expect(configJson).toMatchObject({
        ...tsConfigJson,
        compilerOptions: {
            target: tsConfigJson.compilerOptions.target.toLowerCase(),
            module: tsConfigJson.compilerOptions.module.toLowerCase(),
            outDir: expect.stringMatching(tsConfigJson.compilerOptions.outDir),
            moduleResolution: expect.stringMatching(
                tsConfigJson.compilerOptions.moduleResolution
            )
        }
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
