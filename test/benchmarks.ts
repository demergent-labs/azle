import { readFile, writeFile } from 'fs/promises';

import { getCanisterId } from '../dfx';
// @ts-ignore We would have to add "resolveJsonModule": true to every test tsconfig.json file
import { version } from '../package.json';
import { execSyncPretty } from '../src/build/stable/utils/exec_sync_pretty';

type Benchmark = {
    0: string;
    1: {
        '1_832_883_877': string;
        '2_374_371_241': string;
    };
};

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

export async function runBenchmarksForCanister(
    canisterName: string
): Promise<void> {
    const canisterId = getCanisterId(canisterName);
    const currentBenchmarks: Benchmark[] = JSON.parse(
        execSyncPretty(
            `dfx canister call ${canisterId} _azle_get_benchmarks --output json`,
            'pipe'
        ).toString()
    );

    const benchmarksJson = await getBenchmarksJson();

    await writeBenchmarkMarkdown(
        canisterName,
        currentBenchmarks,
        benchmarksJson
    );
    await writeBenchmarkJson(canisterName, currentBenchmarks, benchmarksJson);
}

async function writeBenchmarkMarkdown(
    canisterName: string,
    currentBenchmarks: Benchmark[],
    benchmarksJson: BenchmarksJson
): Promise<void> {
    const previousBenchmarks = benchmarksJson.previous.benchmarks;

    const benchmarkTables = {
        current: createBenchmarksTable(currentBenchmarks, previousBenchmarks),
        previous: createBenchmarksTable(previousBenchmarks, [])
    };
    const markdownContent =
        `## Current benchmarks Azle version: ${version}\n` +
        `${benchmarkTables.current}\n\n` +
        `## Baseline benchmarks Azle version: ${benchmarksJson.previous.version}\n` +
        `${benchmarkTables.previous}\n`;

    await writeFile(`benchmarks_${canisterName}.md`, markdownContent);
}

async function writeBenchmarkJson(
    canisterName: string,
    currentBenchmarks: Benchmark[],
    benchmarksJson: BenchmarksJson
): Promise<void> {
    const updatedBenchmarksJson: BenchmarksJson = {
        current: { version, benchmarks: currentBenchmarks },
        previous: {
            version: benchmarksJson.previous.version,
            benchmarks:
                benchmarksJson.previous.benchmarks.length === 0 &&
                benchmarksJson.previous.version === version
                    ? currentBenchmarks
                    : benchmarksJson.previous.benchmarks
        }
    };

    await writeFile(
        `benchmarks_${canisterName}.json`,
        `${JSON.stringify(updatedBenchmarksJson, null, 4)}\n`
    );
}

async function getBenchmarksJson(): Promise<BenchmarksJson> {
    const filePath = 'benchmarks.json';

    try {
        const fileContent = await readFile(filePath, 'utf-8');
        return JSON.parse(fileContent);
    } catch (error) {
        if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
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
        throw error; // Re-throw if it's a different error
    }
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

    const note =
        '\n\n---\n\n' +
        '**Note on calculations:**\n' +
        '- Cycles are calculated using the formula: base_fee + (per_instruction_fee * number_of_instructions)\n' +
        '- Base fee: 590,000 cycles\n' +
        '- Per instruction fee: 0.4 cycles\n' +
        '- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.336610 (as of December 18, 2023)\n\n' +
        'For the most up-to-date fee information, please refer to the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).';

    return tableHeader + tableRows + note;
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

function calculateChange(current: string, previous: string): string {
    const diff = parseInt(current) - parseInt(previous);
    const color = diff < 0 ? 'green' : 'red';
    return `<font color="${color}">${diff > 0 ? '+' : ''}${diff}</font>`;
}
