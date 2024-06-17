import * as dns from 'node:dns';
dns.setDefaultResultOrder('ipv4first');

import { describe, expect, test } from '@jest/globals';
import { join } from 'path';

import { execSyncPretty } from '../src/compiler/utils/exec_sync_pretty';
export { expect } from '@jest/globals';

export type Test = () => void;

export function runTests(tests: Test, cwd: string = process.cwd()) {
    const { shouldRunTests, shouldRunTypeChecks, shouldRunBenchmarks } =
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

    if (shouldRunBenchmarks) {
        describe(`benchmarks`, () => {});
    }
}

export function wait(name: string, delay: number) {
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
) {
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

export function it(
    name: string,
    fn: () => void | Promise<void>,
    timeout?: number
) {
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

function processEnvVars(): {
    shouldRunTests: boolean;
    shouldRunTypeChecks: boolean;
    shouldRunBenchmarks: boolean;
} {
    const isTestsEnvVarSet =
        process.env.AZLE_INTEGRATION_TEST_RUN_TESTS === 'true';
    const isTypeChecksEnvVarSet =
        process.env.AZLE_INTEGRATION_TEST_RUN_TYPE_CHECKS === 'true';
    const isBenchmarksEnvVarSet =
        process.env.AZLE_INTEGRATION_TEST_RUN_BENCHMARKS === 'true';

    const areNoVarsSet =
        !isTestsEnvVarSet && !isTypeChecksEnvVarSet && !isBenchmarksEnvVarSet;

    const shouldRunTests = isTestsEnvVarSet || areNoVarsSet;
    const shouldRunTypeChecks = isTypeChecksEnvVarSet || areNoVarsSet;
    const shouldRunBenchmarks = isBenchmarksEnvVarSet || areNoVarsSet;

    return {
        shouldRunTests,
        shouldRunTypeChecks,
        shouldRunBenchmarks
    };
}
