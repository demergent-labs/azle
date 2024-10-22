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
    const allBenchmarks = await getBenchmarksJson();

    for (const canisterName of canisterNames) {
        const canisterId = getCanisterId(canisterName);
        const actor = await createActor(canisterId, 'default');
        const currentBenchmarks = await actor._azle_get_benchmarks();

        if (!allBenchmarks[canisterName]) {
            allBenchmarks[canisterName] = {
                current: { version, benchmarks: [] },
                previous: { version, benchmarks: [] }
            };
        }

        allBenchmarks[canisterName].current = {
            version,
            benchmarks: currentBenchmarks
        };

        if (
            allBenchmarks[canisterName].previous.benchmarks.length === 0 &&
            allBenchmarks[canisterName].previous.version === version
        ) {
            allBenchmarks[canisterName].previous =
                allBenchmarks[canisterName].current;
        }
    }

    await writeBenchmarksMarkdown(canisterNames, allBenchmarks);
    await writeBenchmarksJson(allBenchmarks);
}

async function writeBenchmarksMarkdown(
    canisterNames: string[],
    allBenchmarks: BenchmarksJson
): Promise<void> {
    let markdownContent = '';

    for (const canisterName of canisterNames) {
        const { current, previous } = allBenchmarks[canisterName];
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

    await writeFile(`benchmarks.md`, markdownContent);
}

async function writeBenchmarksJson(
    allBenchmarks: BenchmarksJson
): Promise<void> {
    await writeFile(`benchmarks.json`, `${jsonStringify(allBenchmarks)}\n`);
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
    benchmarks: Benchmark[],
    previousBenchmarks: Benchmark[]
): string {
    if (benchmarks.length === 0) {
        return '';
    }

    const hasChanges = previousBenchmarks.length > 0;
    const tableHeader = createTableHeader(hasChanges);
    const tableRows = createTableRows(
        benchmarks,
        previousBenchmarks,
        hasChanges
    );
    const note = createNote();

    return `${tableHeader}${tableRows}${note}`;
}

function createTableHeader(hasChanges: boolean): string {
    const baseHeader =
        '| Execution | Method Name | Instructions | Cycles | USD |';
    const changeHeader = hasChanges ? ' Change |' : '';
    const separator =
        '\n|-----------|-------------|------------|--------|-----|';
    const changeSeparator = hasChanges ? '-------|' : '';

    return `${baseHeader}${changeHeader}${separator}${changeSeparator}\n`;
}

function createTableRows(
    benchmarks: Benchmark[],
    previousBenchmarks: Benchmark[],
    hasChanges: boolean
): string {
    return benchmarks
        .map((benchmark, index) =>
            createTableRow(
                benchmark,
                index,
                previousBenchmarks[index],
                hasChanges
            )
        )
        .join('\n');
}

function createTableRow(
    benchmark: Benchmark,
    index: number,
    previousBenchmark: Benchmark | undefined,
    hasChanges: boolean
): string {
    const executionNumber = index;
    const methodName = benchmark[1].method_name;
    const instructions = benchmark[1].instructions;
    const cycles = calculateCycles(instructions);
    const usd = calculateUSD(cycles);

    const baseRow = `| ${executionNumber} | ${methodName} | ${instructions.toLocaleString()} | ${cycles.toLocaleString()} | $${usd.toFixed(
        10
    )}`;

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
