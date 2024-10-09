import * as dns from 'node:dns';
dns.setDefaultResultOrder('ipv4first');

import { ActorSubclass } from '@dfinity/agent';
import { describe, expect, test } from '@jest/globals';
import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';

import { getCanisterId } from '../dfx';
// @ts-ignore We would have to add "resolveJsonModule": true to every test tsconfig.json file
import { version } from '../package.json';
import { execSyncPretty } from '../src/build/stable/utils/exec_sync_pretty';
export { expect } from '@jest/globals';

export type Test = () => void;

type Benchmark = {
    0: string;
    1: {
        '1_832_883_877': string;
        '2_374_371_241': string;
    };
};

export function runTests(
    tests: Test,
    canisterNames: string | string[] | undefined = undefined,
    cwd: string = process.cwd()
): void {
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

    if (shouldRunBenchmarks && canisterNames !== undefined) {
        const canisterNamesArray = Array.isArray(canisterNames)
            ? canisterNames
            : [canisterNames];

        canisterNamesArray.forEach((canisterName) => {
            describe(`benchmarks for ${canisterName}`, () => {
                it('runs benchmarks', async () => {
                    const canisterId = getCanisterId(canisterName);
                    const result = execSyncPretty(
                        `dfx canister call ${canisterId} _azle_get_benchmarks --output json`,
                        'pipe'
                    );
                    const currentBenchmarks: Benchmark[] = JSON.parse(
                        result.toString()
                    );

                    const benchmarksJson = await getBenchmarksJson();
                    const previousBenchmarks =
                        benchmarksJson.previous.benchmarks;

                    const currentBenchmarksTable = createBenchmarksTable(
                        currentBenchmarks,
                        previousBenchmarks
                    );

                    const previousBenchmarksTable = createBenchmarksTable(
                        previousBenchmarks,
                        []
                    );

                    await writeFile(
                        `benchmarks_${canisterName}.md`,
                        `## Current benchmarks Azle version: ${version}\n${currentBenchmarksTable}\n\n## Baseline benchmarks Azle version: ${benchmarksJson.previous.version}\n${previousBenchmarksTable}`
                    );

                    const updatedBenchmarksJson: BenchmarksJson = {
                        current: {
                            version,
                            benchmarks: currentBenchmarks
                        },
                        previous: {
                            version: benchmarksJson.previous.version,
                            benchmarks:
                                benchmarksJson.previous.benchmarks.length ===
                                    0 &&
                                benchmarksJson.previous.version === version
                                    ? currentBenchmarks
                                    : benchmarksJson.previous.benchmarks
                        }
                    };

                    await writeFile(
                        `benchmarks_${canisterName}.json`,
                        `${JSON.stringify(updatedBenchmarksJson, null, 4)}\n`
                    );
                });
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

function processEnvVars(): {
    shouldRunTests: boolean;
    shouldRunTypeChecks: boolean;
    shouldRunBenchmarks: boolean;
} {
    const runTests = process.env.AZLE_RUN_TESTS ?? 'true';
    const runTypeChecks = process.env.AZLE_RUN_TYPE_CHECKS ?? 'true';
    const runBenchmarks = process.env.AZLE_RUN_BENCHMARKS ?? 'true';

    const hasOnly = [runTests, runTypeChecks, runBenchmarks].includes('only');

    return {
        shouldRunTests: hasOnly ? runTests === 'only' : runTests !== 'false',
        shouldRunTypeChecks: hasOnly
            ? runTypeChecks === 'only'
            : runTypeChecks !== 'false',
        shouldRunBenchmarks: hasOnly
            ? runBenchmarks === 'only'
            : runBenchmarks !== 'false'
    };
}

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

type BenchmarksJson = {
    current: {
        version: string;
        benchmarks: Benchmark[];
    };
    previous: {
        version: string;
        benchmarks: Benchmark[];
    };
};

import { existsSync } from 'fs';

async function getBenchmarksJson(): Promise<BenchmarksJson> {
    const filePath = 'benchmarks.json';

    if (!existsSync(filePath)) {
        return {
            current: {
                version,
                benchmarks: []
            },
            previous: {
                version,
                benchmarks: []
            }
        };
    }

    return JSON.parse(await readFile(filePath, 'utf-8'));
}

function calculateCycles(instructions: number): number {
    const baseFee = 590_000;
    const perInstructionFee = 0.4;
    return Math.round(baseFee + perInstructionFee * instructions);
}

function calculateUSD(cycles: number): number {
    const cyclesPerXDR = 1_000_000_000_000; // 1 trillion cycles = 1 XDR
    const usdPerXDR = 1.33661; // As of December 18, 2023
    return (cycles / cyclesPerXDR) * usdPerXDR;
}

function createBenchmarksTable(
    benchmarks: Benchmark[],
    previousBenchmarks: Benchmark[]
): string {
    if (benchmarks.length === 0) {
        return '';
    }

    const hasChanges = previousBenchmarks.length > 0;

    const tableHeader = hasChanges
        ? '| Execution | Method Name | Instructions | Cycles | USD | Change |\n|-----------|-------------|------------|--------|-----|-------|\n'
        : '| Execution | Method Name | Instructions | Cycles | USD |\n|-----------|-------------|------------|--------|-----|\n';

    const calculateChange = (current: string, previous: string): string => {
        const diff = parseInt(current) - parseInt(previous);
        const color = diff < 0 ? 'green' : 'red';
        return `<font color="${color}">${diff > 0 ? '+' : ''}${diff}</font>`;
    };

    const tableRows = benchmarks
        .map((benchmark: Benchmark, index: number) => {
            const executionNumber = index;
            const methodName = benchmark[1]['2_374_371_241'];
            const instructions = parseInt(benchmark[1]['1_832_883_877']);
            const cycles = calculateCycles(instructions);
            const usd = calculateUSD(cycles);
            const previousBenchmark = previousBenchmarks[index];

            const baseRow = `| ${executionNumber} | ${methodName} | ${instructions.toLocaleString()} | ${cycles.toLocaleString()} | $${usd.toFixed(
                10
            )}`;

            if (!hasChanges) {
                return `${baseRow} |`;
            }

            const change = previousBenchmark
                ? calculateChange(
                      instructions.toString(),
                      previousBenchmark[1]['1_832_883_877']
                  )
                : '';

            return `${baseRow} | ${change} |`;
        })
        .join('\n');

    const note = `
\n\n---

**Note on calculations:**
- Cycles are calculated using the formula: base_fee + (per_instruction_fee * number_of_instructions)
- Base fee: 590,000 cycles
- Per instruction fee: 0.4 cycles
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.336610 (as of December 18, 2023)

For the most up-to-date fee information, please refer to the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
`;

    return tableHeader + tableRows + note;
}
