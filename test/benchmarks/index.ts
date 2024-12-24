import { readFile, writeFile } from 'fs/promises';

import { getCanisterId, whoami } from '../../dfx';
// @ts-ignore We would have to add "resolveJsonModule": true to every test tsconfig.json file
import { version } from '../../package.json';
import { jsonParse, jsonStringify } from '../../src/lib/stable';
import { createActor } from './actor';

type BenchmarkEntry = {
    method_name: string;
    instructions: bigint;
    timestamp: bigint;
};

type CanisterBenchmark = {
    current: {
        version: string;
        benchmarks: BenchmarkEntry[];
    };
    previous: {
        version: string;
        benchmarks: BenchmarkEntry[];
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
        const actor = await createActor(canisterId, whoami());
        const currentBenchmarks = await actor._azle_get_benchmarks();

        const previousCurrentVersion = acc[canisterName]?.current.version;
        const shouldUpdatePrevious = previousCurrentVersion !== version;

        return {
            ...acc,
            [canisterName]: {
                previous: shouldUpdatePrevious
                    ? (acc[canisterName]?.current ?? {
                          version: 'No previous benchmarks',
                          benchmarks: []
                      })
                    : acc[canisterName]?.previous,
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
    const markdownContent =
        canisterNames
            .map((canisterName) => {
                const { current, previous } = updatedBenchmarks[canisterName];
                const benchmarkTables = {
                    current: createBenchmarksTable(
                        current.benchmarks,
                        previous.benchmarks
                    ),
                    previous: createBenchmarksTable(previous.benchmarks, [])
                };

                return (
                    `# Benchmarks for ${canisterName}\n\n` +
                    `## Current benchmarks Azle version: ${current.version}\n` +
                    `${benchmarkTables.current}\n\n` +
                    `## Baseline benchmarks Azle version: ${previous.version}\n` +
                    `${benchmarkTables.previous}\n\n`
                );
            })
            .join('') + createNote();

    await writeFile(`benchmarks.md`, markdownContent);
}

async function writeBenchmarksJson(
    updatedBenchmarks: BenchmarksJson
): Promise<void> {
    await writeFile(
        `benchmarks.json`,
        `${jsonStringify(updatedBenchmarks, undefined, 4)}\n`
    );
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
    currentBenchmarks: BenchmarkEntry[],
    previousBenchmarks: BenchmarkEntry[]
): string {
    if (currentBenchmarks.length === 0) {
        return 'No benchmarks reported';
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
        '| Id | Method Name | Instructions | Cycles | USD | USD/Million Calls |';
    const changeHeader = hasChanges ? ' Change |' : '';
    const separator =
        '\n|-----------|-------------|------------|--------|-----|--------------|';
    const changeSeparator = hasChanges ? '-------|' : '';

    return `${baseHeader}${changeHeader}${separator}${changeSeparator}\n`;
}

function createTableRows(
    currentBenchmarks: BenchmarkEntry[],
    previousBenchmarks: BenchmarkEntry[],
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
    currentBenchmark: BenchmarkEntry,
    index: number,
    previousBenchmark: BenchmarkEntry | undefined,
    hasChanges: boolean
): string {
    const executionNumber = index;
    const methodName = currentBenchmark.method_name;
    const instructions = currentBenchmark.instructions;
    const cycles = calculateCycles(instructions);
    const usd = calculateUSD(cycles);
    const usdPerMillion = usd * 1_000_000;

    const baseRow = `| ${executionNumber} | ${methodName} | ${formatWithUnderscores(
        instructions
    )} | ${formatWithUnderscores(cycles)} | $${usd.toFixed(
        10
    )} | $${formatWithUnderscores(usdPerMillion, 2)}`;

    if (!hasChanges) {
        return `${baseRow} |`;
    }

    const change = previousBenchmark
        ? calculateChange(instructions, previousBenchmark.instructions)
        : '';

    return `${baseRow} | ${change} |`;
}

function createNote(): string {
    return `

---

**Note on calculations:**
- Cycles are calculated using the formula: base_fee + (per_instruction_fee \\* number_of_instructions) + (additional_fee_per_billion \\* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).`;
}

function calculateCycles(instructions: bigint): bigint {
    const baseFee = 590_000n;
    const perInstructionFee = 4n; // Multiplied by 10 to avoid fractional bigint
    const additionalFeePerBillion = 400_000_000n;

    const instructionFee = (perInstructionFee * instructions) / 10n;
    const additionalFee =
        (instructions / 1_000_000_000n) * additionalFeePerBillion;

    return baseFee + instructionFee + additionalFee;
}

function calculateUSD(cycles: bigint): number {
    const cyclesPerXDR = 1_000_000_000_000; // 1 trillion cycles = 1 XDR
    const usdPerXDR = 1.32967; // As of October 24, 2024
    return (Number(cycles) / cyclesPerXDR) * usdPerXDR;
}

function calculateChange(current: bigint, previous: bigint): string {
    const diff = current - previous;
    const color = diff < 0 ? 'green' : 'red';
    return `<font color="${color}">${
        diff > 0 ? '+' : ''
    }${formatWithUnderscores(diff)}</font>`;
}

function formatWithUnderscores(
    value: bigint | number,
    decimalPlaces?: number
): string {
    const [integerPart, decimalPart] = value.toString().split('.');
    const formattedIntegerPart = integerPart.replace(
        /\B(?=(\d{3})+(?!\d))/g,
        '_'
    );
    if (decimalPart !== undefined && decimalPlaces !== undefined) {
        const truncatedDecimalPart = decimalPart.slice(0, decimalPlaces);
        return `${formattedIntegerPart}.${truncatedDecimalPart}`;
    }
    if (decimalPart !== undefined) {
        return `${formattedIntegerPart}.${decimalPart}`;
    }
    return formattedIntegerPart;
}
