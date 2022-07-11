import { execSync } from 'child_process';
import { writeFileSync } from 'fs';

export type Benchmark = {
    canister_method: string;
    benchmark_description: string;
    args?: any[];
};

export type BenchmarkResult = {
    canister_method: string;
    benchmark_description: string;
    azle_wasm_instructions: number;
    motoko_wasm_instructions: number;
    rust_wasm_instructions: number;
    azle_motoko_change_multiplier: number;
    azle_rust_change_multiplier: number;
    motoko_azle_change_multiplier: number;
    motoko_rust_change_multiplier: number;
    rust_azle_change_multiplier: number;
    rust_motoko_change_multiplier: number;
};

let azle_canister: any = undefined;
let motoko_canister: any = undefined;
let rust_canister: any = undefined;

async function run_setup() {
    execSync(`dfx canister uninstall-code azle || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx canister uninstall-code motoko || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx canister uninstall-code rust || true`, {
        stdio: 'inherit'
    });

    await new Promise((resolve) => setTimeout(resolve, 5000));

    execSync(`dfx canister create azle`, {
        stdio: 'inherit'
    });

    execSync(`dfx build azle`, {
        stdio: 'inherit'
    });

    execSync(
        `dfx canister install azle --wasm target/wasm32-unknown-unknown/release/azle.wasm.gz`,
        {
            stdio: 'inherit'
        }
    );

    execSync(`dfx deploy motoko`, {
        stdio: 'inherit'
    });

    execSync(`dfx deploy rust`, {
        stdio: 'inherit'
    });
}

export async function run_benchmarks(
    benchmarks: Benchmark[],
    _azle_canister: any,
    _motoko_canister: any,
    _rust_canister: any,
    num_benchmark_iterations: number = 10,
    output_file: string = 'benchmarks',
    setup: boolean = true
): Promise<BenchmarkResult[]> {
    azle_canister = _azle_canister;
    motoko_canister = _motoko_canister;
    rust_canister = _rust_canister;

    if (setup === true) {
        await run_setup();
    }

    const benchmark_promises: BenchmarkResult[] = await benchmarks.reduce(async (result: Promise<BenchmarkResult[]>, benchmark) => {
        const resolved_result = await result;

        const benchmark_iteration_promises = new Array(num_benchmark_iterations).fill(0).map((_) => {
            return run_benchmark(
                benchmark.canister_method,
                benchmark.benchmark_description,
                benchmark.args
            );
        });

        const benchmark_iteration_results = await Promise.all(benchmark_iteration_promises);

        const azle_wasm_instructions = benchmark_iteration_results.map((x) => x.azle_wasm_instructions);
        const motoko_wasm_instructions = benchmark_iteration_results.map((x) => x.motoko_wasm_instructions);
        const rust_wasm_instructions = benchmark_iteration_results.map((x) => x.rust_wasm_instructions);

        const azle_motoko_change_multipliers = benchmark_iteration_results.map((x) => x.azle_motoko_change_multiplier);
        const azle_rust_change_multipliers = benchmark_iteration_results.map((x) => x.azle_rust_change_multiplier);
        const motoko_azle_change_multipliers = benchmark_iteration_results.map((x) => x.motoko_azle_change_multiplier);
        const motoko_rust_change_multipliers = benchmark_iteration_results.map((x) => x.motoko_rust_change_multiplier);
        const rust_azle_change_multipliers = benchmark_iteration_results.map((x) => x.rust_azle_change_multiplier);
        const rust_motoko_change_multipliers = benchmark_iteration_results.map((x) => x.rust_motoko_change_multiplier);

        return [
            ...resolved_result,
            {
                canister_method: benchmark.canister_method,
                benchmark_description: benchmark.benchmark_description,
                azle_wasm_instructions: calculate_average(azle_wasm_instructions),
                motoko_wasm_instructions: calculate_average(motoko_wasm_instructions),
                rust_wasm_instructions: calculate_average(rust_wasm_instructions),
                azle_motoko_change_multiplier: calculate_average(azle_motoko_change_multipliers),
                azle_rust_change_multiplier: calculate_average(azle_rust_change_multipliers),
                motoko_azle_change_multiplier: calculate_average(motoko_azle_change_multipliers),
                motoko_rust_change_multiplier: calculate_average(motoko_rust_change_multipliers),
                rust_azle_change_multiplier: calculate_average(rust_azle_change_multipliers),
                rust_motoko_change_multiplier: calculate_average(rust_motoko_change_multipliers)
            }
        ];
    }, Promise.resolve([]));

    const benchmark_results: BenchmarkResult[] = await Promise.all(benchmark_promises);

    if (output_file !== undefined) {
        const markdown_report = create_markdown_report(benchmark_results);
        const csv_report = create_csv_report(benchmark_results);
        writeFileSync(`${output_file}.md`, markdown_report);
        writeFileSync(`${output_file}.csv`, csv_report)
    }

    return benchmark_results;
}

async function run_benchmark(
    canister_method: string,
    benchmark_description: string = canister_method,
    args: any[] = []
): Promise<BenchmarkResult> {
    console.log(`benchmark ${canister_method}: ${benchmark_description}\n`);

    const azle_wasm_instructions = Number((await (azle_canister as any)[canister_method](...args)));
    const motoko_wasm_instructions = Number((await (motoko_canister as any)[canister_method](...args)));
    const rust_wasm_instructions = Number((await (rust_canister as any)[canister_method](...args)));

    const {
        language2_change_multiplier: azle_motoko_change_multiplier,
        language3_change_multiplier: azle_rust_change_multiplier
    } = calculate_change_multiplier(
        azle_wasm_instructions,
        motoko_wasm_instructions,
        rust_wasm_instructions
    );

    const {
        language2_change_multiplier: motoko_azle_change_multiplier,
        language3_change_multiplier: motoko_rust_change_multiplier
    } = calculate_change_multiplier(
        motoko_wasm_instructions,
        azle_wasm_instructions,
        rust_wasm_instructions
    );

    const {
        language2_change_multiplier: rust_azle_change_multiplier,
        language3_change_multiplier: rust_motoko_change_multiplier
    } = calculate_change_multiplier(
        rust_wasm_instructions,
        azle_wasm_instructions,
        motoko_wasm_instructions
    );

    return {
        canister_method,
        benchmark_description,
        azle_wasm_instructions,
        motoko_wasm_instructions,
        rust_wasm_instructions,
        azle_motoko_change_multiplier,
        azle_rust_change_multiplier,
        motoko_azle_change_multiplier,
        motoko_rust_change_multiplier,
        rust_azle_change_multiplier,
        rust_motoko_change_multiplier
    };
}

function calculate_change_multiplier(
    language1_wasm_instructions: number,
    language2_wasm_instructions: number,
    language3_wasm_instructions: number
): {
    language2_change_multiplier: number;
    language3_change_multiplier: number;
} {
    return {
        language2_change_multiplier: language1_wasm_instructions >= language2_wasm_instructions ? (language1_wasm_instructions / language2_wasm_instructions) : (language2_wasm_instructions / language1_wasm_instructions) * -1,
        language3_change_multiplier: language1_wasm_instructions >= language3_wasm_instructions ? (language1_wasm_instructions / language3_wasm_instructions) : (language3_wasm_instructions / language1_wasm_instructions) * -1
    };
}

function create_markdown_report(benchmark_results: BenchmarkResult[]): string {
    const title = `# Azle/Rust/Motoko Benchmarks`;

    const description = `
- These benchmarks should be considered preliminary (especially the Motoko benchmarks, something seems off)
- These benchmarks were implemented using the performance counter API
    - Performance counter information in [The Internet Computer Interface Spec](https://internetcomputer.org/docs/current/references/ic-interface-spec/#system-api-imports)
    - Performance counter information in [the forum](https://forum.dfinity.org/t/introducing-performance-counter-on-the-internet-computer/14027)
- The results were obtained for each data type by returning the performance counter value after performing n iterations of value initializations on the stack and heap in each language
- Each benchmark description gives the benchmark function name followed by the number of value initializations performed by the benchmark function
- All benchmark code can be found [here](https://github.com/demergent-labs/azle/tree/26_benchmarking/benchmark/primitive_ops)
- The following may be missing from the benchmarks as described [here](https://forum.dfinity.org/t/introducing-performance-counter-on-the-internet-computer/14027):
    - Candid serialization/deserialization of function parameters and return types
    - Canister method prologue/epilogue
    - Some Motoko runtime behavior (such as garbage collection)
    `;

    const header_names = ['Description', 'Azle Wasm Instructions', 'Motoko Wasm Instructions', 'Rust Wasm Instructions', 'Azle/Motoko Change Multiplier', 'Azle/Rust Change Multiplier', 'Motoko/Azle Change Multiplier', 'Motoko/Rust Change Multiplier', 'Rust/Azle Change Multiplier', 'Rust/Motoko Change Multiplier'];

    const header = `| ${header_names.join(' | ')} |`;

    const header_separator = `| ${header_names.map((_) => '---').join(' | ')} |`;

    const data_rows = benchmark_results.map((benchmark_result) => {
        return `| ${benchmark_result.canister_method}${benchmark_result.benchmark_description !== '' ? `: ${benchmark_result.benchmark_description}` : ''} | ${format_number_to_rust(benchmark_result.azle_wasm_instructions.toFixed(0))} | ${format_number_to_rust(benchmark_result.motoko_wasm_instructions.toFixed(0))} |${format_number_to_rust(benchmark_result.rust_wasm_instructions.toFixed(0))} | ${format_number_to_rust(benchmark_result.azle_motoko_change_multiplier.toFixed(0))}x | ${format_number_to_rust(benchmark_result.azle_rust_change_multiplier.toFixed(0))}x | ${format_number_to_rust(benchmark_result.motoko_azle_change_multiplier.toFixed(0))}x | ${format_number_to_rust(benchmark_result.motoko_rust_change_multiplier.toFixed(0))}x | ${format_number_to_rust(benchmark_result.rust_azle_change_multiplier.toFixed(0))}x | ${format_number_to_rust(benchmark_result.rust_motoko_change_multiplier.toFixed(0))}x |`;
    });

    const average_azle_wasm_instructions = format_number_to_rust(calculate_average(benchmark_results.map((x) => x.azle_wasm_instructions)).toFixed(0));
    const average_motoko_wasm_instructions = format_number_to_rust(calculate_average(benchmark_results.map((x) => x.motoko_wasm_instructions)).toFixed(0));
    const average_rust_wasm_instructions = format_number_to_rust(calculate_average(benchmark_results.map((x) => x.rust_wasm_instructions)).toFixed(0));
    const average_azle_motoko_change_multiplier = format_number_to_rust(calculate_average(benchmark_results.map((x) => x.azle_motoko_change_multiplier)).toFixed(0));
    const average_azle_rust_change_multiplier = format_number_to_rust(calculate_average(benchmark_results.map((x) => x.azle_rust_change_multiplier)).toFixed(0));
    const average_motoko_azle_change_multiplier = format_number_to_rust(calculate_average(benchmark_results.map((x) => x.motoko_azle_change_multiplier)).toFixed(0));
    const average_motoko_rust_change_multiplier = format_number_to_rust(calculate_average(benchmark_results.map((x) => x.motoko_rust_change_multiplier)).toFixed(0));
    const average_rust_azle_change_multiplier = format_number_to_rust(calculate_average(benchmark_results.map((x) => x.rust_azle_change_multiplier)).toFixed(0));
    const average_rust_motoko_change_multiplier = format_number_to_rust(calculate_average(benchmark_results.map((x) => x.rust_motoko_change_multiplier)).toFixed(0));


    return `${title}\n${description}\n${header}\n${header_separator}\n${data_rows.join('\n')}\n\nAverage Azle Wasm Instructions: ${average_azle_wasm_instructions}\n\nAverage Motoko Wasm Instructions: ${average_motoko_wasm_instructions}\n\nAverage Rust Wasm Instructions: ${average_rust_wasm_instructions}\n\nAverage Azle/Motoko Change Multiplier: ${average_azle_motoko_change_multiplier}x\n\nAverage Azle/Rust Change Multiplier: ${average_azle_rust_change_multiplier}x\n\nAverage Motoko/Azle Change Multiplier: ${average_motoko_azle_change_multiplier}x\n\nAverage Motoko/Rust Change Multiplier: ${average_motoko_rust_change_multiplier}x\n\nAverage Rust/Azle Change Multiplier: ${average_rust_azle_change_multiplier}x\n\nAverage Rust/Motoko Change Multiplier: ${average_rust_motoko_change_multiplier}x`;
}

function create_csv_report(benchmark_results: BenchmarkResult[]): string {
    const header_names = ['Description', 'Azle Wasm Instructions', 'Motoko Wasm Instructions', 'Rust Wasm Instructions', 'Azle/Motoko Change Multiplier', 'Azle/Rust Change Multiplier', 'Motoko/Azle Change Multiplier', 'Motoko/Rust Change Multiplier', 'Rust/Azle Change Multiplier', 'Rust/Motoko Change Multiplier'].join(',');

    const data_rows = benchmark_results.map((benchmark_result) => {
        return `${benchmark_result.canister_method}${benchmark_result.benchmark_description !== '' ? `: ${benchmark_result.benchmark_description}` : ''},${benchmark_result.azle_wasm_instructions.toFixed(0)},${benchmark_result.motoko_wasm_instructions.toFixed(0)},${benchmark_result.rust_wasm_instructions.toFixed(0)},${benchmark_result.azle_motoko_change_multiplier.toFixed(0)},${benchmark_result.azle_rust_change_multiplier.toFixed(0)},${benchmark_result.motoko_azle_change_multiplier.toFixed(0)},${benchmark_result.motoko_rust_change_multiplier.toFixed(0)},${benchmark_result.rust_azle_change_multiplier.toFixed(0)},${benchmark_result.rust_motoko_change_multiplier.toFixed(0)}`;
    }).join('\n');

    return `${header_names}\n${data_rows}`;
}

function format_number_to_rust(cycles: string | number | bigint) {
    const negative = cycles.toString()[0] === '-';

    return (negative ? '-' : '') + cycles
        .toString()
        .replace('-', '')
        .split('')
        .reverse()
        .reduce((result, char, index) => {
            return `${result}${index !== 0 && index % 3 === 0 ? '_' : ''}${char}`;
        }, '')
        .split('')
        .reverse()
        .join('');
}

function calculate_average(elements: number[]): number {
    return elements.reduce((sum, element) => {
        return sum + element;
    }, 0) / elements.length;
}