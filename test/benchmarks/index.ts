import { readFile, writeFile } from 'fs/promises';

import { getCanisterId } from '../../dfx';
// @ts-ignore We would have to add "resolveJsonModule": true to every test tsconfig.json file
import { version } from '../../package.json';
import { jsonParse, jsonStringify } from '../../src/lib/stable';
import { createActor } from './actor';

type Benchmark = [bigint, { method_name: string; instructions: bigint }];

type CanisterBenchmark = {
    current: {
        version: string;
        benchmarks: Benchmark[];
    };
    previous: {
        version: string;
        benchmarks: Benchmark[];
    };
};

type BenchmarksJson = {
    [canisterName: string]: CanisterBenchmark;
};

export async function runBenchmarksForCanisters(
    canisterNames: string[]
): Promise<void> {
    const existingBenchmarks = await getBenchmarksJson();
    const updatedBenchmarks = await updateBenchmarksForCanisters(
        canisterNames,
        existingBenchmarks
    );
    await writeBenchmarkResults(canisterNames, updatedBenchmarks);
}

async function updateBenchmarksForCanisters(
    canisterNames: string[],
    existingBenchmarks: BenchmarksJson
): Promise<BenchmarksJson> {
    return canisterNames.reduce(async (accPromise, canisterName) => {
        const acc = await accPromise;
        const canisterId = getCanisterId(canisterName);
        const actor = await createActor(canisterId, 'default');
        const currentBenchmarks = await actor._azle_get_benchmarks();

        return {
            ...acc,
            [canisterName]: {
                previous: acc[canisterName]?.current || {
                    version,
                    benchmarks: []
                },
                current: {
                    version,
                    benchmarks: currentBenchmarks
                }
            }
        };
    }, Promise.resolve(existingBenchmarks));
}

async function writeBenchmarkResults(
    canisterNames: string[],
    updatedBenchmarks: BenchmarksJson
): Promise<void> {
    await writeBenchmarksMarkdown(canisterNames, updatedBenchmarks);
    await writeBenchmarksJson(updatedBenchmarks);
}

async function writeBenchmarksMarkdown(
    canisterNames: string[],
    updatedBenchmarks: BenchmarksJson
): Promise<void> {
    let markdownContent = '';

    for (const canisterName of canisterNames) {
        const { current, previous } = updatedBenchmarks[canisterName];
        const benchmarkTables = {
            current: createBenchmarksTable(
                current.benchmarks,
                previous.benchmarks
            ),
            previous: createBenchmarksTable(previous.benchmarks, [])
        };

        markdownContent +=
            `# Benchmarks for ${canisterName}\n\n` +
            `## Current benchmarks Azle version: ${current.version}\n` +
            `${benchmarkTables.current}\n\n` +
            `## Baseline benchmarks Azle version: ${previous.version}\n` +
            `${benchmarkTables.previous}\n\n`;
    }

    markdownContent += createNote();

    await writeFile(`benchmarks.md`, markdownContent);
}

async function writeBenchmarksJson(
    updatedBenchmarks: BenchmarksJson
): Promise<void> {
    await writeFile(`benchmarks.json`, `${jsonStringify(updatedBenchmarks)}\n`);
}

async function getBenchmarksJson(): Promise<BenchmarksJson> {
    const filePath = 'benchmarks.json';

    try {
        const fileContent = await readFile(filePath, 'utf-8');
        return jsonParse(fileContent);
    } catch (error) {
        if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
            return {};
        }
        throw error; // Re-throw if it's a different error
    }
}

function createBenchmarksTable(
    currentBenchmarks: Benchmark[],
    previousBenchmarks: Benchmark[]
): string {
    if (currentBenchmarks.length === 0) {
        return '';
    }

    const hasChanges = previousBenchmarks.length > 0;
    const tableHeader = createTableHeader(hasChanges);
    const tableRows = createTableRows(
        currentBenchmarks,
        previousBenchmarks,
        hasChanges
    );

    return `${tableHeader}${tableRows}`;
}

function createTableHeader(hasChanges: boolean): string {
    const baseHeader =
        '| Execution | Method Name | Instructions | Cycles | USD | USD/Thousand Calls |';
    const changeHeader = hasChanges ? ' Change |' : '';
    const separator =
        '\n|-----------|-------------|------------|--------|-----|--------------|';
    const changeSeparator = hasChanges ? '-------|' : '';

    return `${baseHeader}${changeHeader}${separator}${changeSeparator}\n`;
}

function createTableRows(
    currentBenchmarks: Benchmark[],
    previousBenchmarks: Benchmark[],
    hasChanges: boolean
): string {
    return currentBenchmarks
        .map((currentBenchmark, index) =>
            createTableRow(
                currentBenchmark,
                index,
                previousBenchmarks[index],
                hasChanges
            )
        )
        .join('\n');
}

function createTableRow(
    currentBenchmark: Benchmark,
    index: number,
    previousBenchmark: Benchmark | undefined,
    hasChanges: boolean
): string {
    const executionNumber = index;
    const methodName = currentBenchmark[1].method_name;
    const instructions = currentBenchmark[1].instructions;
    const cycles = calculateCycles(instructions);
    const usd = calculateUSD(cycles);
    const usdPerThousand = (usd * 1_000).toFixed(4);

    const baseRow = `| ${executionNumber} | ${methodName} | ${instructions.toLocaleString()} | ${cycles.toLocaleString()} | $${usd.toFixed(
        10
    )} | $${usdPerThousand}`;

    if (!hasChanges) {
        return `${baseRow} |`;
    }

    const change = previousBenchmark
        ? calculateChange(instructions, previousBenchmark[1].instructions)
        : '';

    return `${baseRow} | ${change} |`;
}

function createNote(): string {
    return `

---

**Note on calculations:**
- Cycles are calculated using the formula: base_fee + (per_instruction_fee * number_of_instructions)
- Base fee: 590,000 cycles
- Per instruction fee: 0.4 cycles
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.336610 (as of December 18, 2023)

For the most up-to-date fee information, please refer to the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).`;
}

function calculateCycles(instructions: bigint): bigint {
    const baseFee = 590_000n;
    const perInstructionFee = 4n; // Multiplied by 10 to avoid fractional bigint
    return baseFee + (perInstructionFee * instructions) / 10n;
}

function calculateUSD(cycles: bigint): number {
    const cyclesPerXDR = 1_000_000_000_000; // 1 trillion cycles = 1 XDR
    const usdPerXDR = 1.33661; // As of December 18, 2023
    return (Number(cycles) / cyclesPerXDR) * usdPerXDR;
}

function calculateChange(current: bigint, previous: bigint): string {
    const diff = current - previous;
    const color = diff < 0 ? 'green' : 'red';
    return `<font color="${color}">${diff > 0 ? '+' : ''}${diff}</font>`;
}