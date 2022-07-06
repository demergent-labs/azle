import { execSync } from 'child_process';
import { writeFileSync } from 'fs';

const NUM_BENCHMARK_ITERATIONS = 10;

export type Benchmark = {
    canister_method: string;
    benchmark_description: string;
    args?: any[];
};

export type BenchmarkResult = {
    canister_method: string;
    benchmark_description: string;
    azle_wasm_instructions: number;
    rust_wasm_instructions: number;
    rust_percentage_change: number;
    rust_change_multiplier: number;
};

let azle_canister: any = undefined;
let rust_canister: any = undefined;

async function run_setup() {
    execSync(`dfx canister uninstall-code azle || true`, {
        stdio: 'inherit'
    });

    // execSync(`dfx canister uninstall-code motoko || true`, {
    //     stdio: 'inherit'
    // });

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

    // execSync(`dfx deploy motoko`, {
    //     stdio: 'inherit'
    // });

    execSync(`dfx deploy rust`, {
        stdio: 'inherit'
    });
}

export async function run_benchmarks(
    benchmarks: Benchmark[],
    _azle_canister: any,
    _rust_canister: any,
    output_file?: string,
    setup: boolean = true
): Promise<BenchmarkResult[]> {
    azle_canister = _azle_canister;
    rust_canister = _rust_canister;

    if (setup === true) {
        await run_setup();
    }

    const benchmark_promises: BenchmarkResult[] = await benchmarks.reduce(async (result: Promise<BenchmarkResult[]>, benchmark) => {
        const resolved_result = await result;

        const benchmark_iteration_promises = new Array(NUM_BENCHMARK_ITERATIONS).fill(0).map((_) => {
            return run_benchmark(
                benchmark.canister_method,
                benchmark.benchmark_description,
                benchmark.args
            );
        });

        const benchmark_iteration_results = await Promise.all(benchmark_iteration_promises);

        const azle_wasm_instructions = benchmark_iteration_results.map((x) => x.azle_wasm_instructions);
        const rust_wasm_instructions = benchmark_iteration_results.map((x) => x.rust_wasm_instructions);
        
        const rust_percentage_changes = benchmark_iteration_results.map((x) => x.rust_percentage_change);
        const rust_change_multipliers = benchmark_iteration_results.map((x) => x.rust_change_multiplier);

        return [
            ...resolved_result,
            {
                canister_method: benchmark.canister_method,
                benchmark_description: benchmark.benchmark_description,
                azle_wasm_instructions: calculate_average(azle_wasm_instructions),
                rust_wasm_instructions: calculate_average(rust_wasm_instructions),
                rust_percentage_change: calculate_average(rust_percentage_changes),
                rust_change_multiplier: calculate_average(rust_change_multipliers)
            }
        ];
    }, Promise.resolve([]));

    const benchmark_results: BenchmarkResult[] = await Promise.all(benchmark_promises);

    if (output_file !== undefined) {
        const markdown_report = create_markdown_report(benchmark_results);
        writeFileSync(output_file, markdown_report);
    }

    return benchmark_results;
}

async function run_benchmark(
    canister_method: string,
    benchmark_description: string = canister_method,
    args: any[] = []
): Promise<BenchmarkResult> {
    console.log(`benchmark ${canister_method}: ${benchmark_description}\n`);

    const azle_wasm_instructions = Number((await (azle_canister as any)[canister_method](...args)).wasm_instructions);
    // const motoko_wasm_instructions = Number(await motoko_canister[canister_method](...args)) - motoko_baseline;
    const motoko_wasm_instructions = 0;
    const rust_wasm_instructions = Number((await (rust_canister as any)[canister_method](...args)).wasm_instructions);

    const {
        motoko_percentage_change,
        rust_percentage_change
    } = calculate_percentage_change(
        azle_wasm_instructions,
        motoko_wasm_instructions,
        rust_wasm_instructions
    );

    const {
        motoko_change_multiplier,
        rust_change_multiplier
    } = calculate_change_multiplier(
        azle_wasm_instructions,
        motoko_wasm_instructions,
        rust_wasm_instructions
    );

    // console.log('azle_wasm_instructions', azle_wasm_instructions);
    // console.log('motoko_wasm_instructions', motoko_wasm_instructions);
    // console.log('rust_wasm_instructions', rust_wasm_instructions, '\n');

    // console.log(`Azle/Motoko percentage change: ${motoko_percentage_change}%`);
    // console.log(`Azle/Motoko change multiplier: ${motoko_change_multiplier}x\n`);

    // console.log(`Azle/Rust percentage change: ${rust_percentage_change}%`);
    // console.log(`Azle/Rust change multiplier: ${rust_change_multiplier}x\n\n`);

    return {
        canister_method,
        benchmark_description,
        azle_wasm_instructions,
        rust_wasm_instructions,
        rust_percentage_change,
        rust_change_multiplier
    };
}

function calculate_percentage_change(
    azle_wasm_instructions: number,
    motoko_wasm_instructions: number,
    rust_wasm_instructions: number
): {
    motoko_percentage_change: number;
    rust_percentage_change: number;
} {
    return {
        motoko_percentage_change: (((azle_wasm_instructions - motoko_wasm_instructions) / motoko_wasm_instructions) * 100),
        rust_percentage_change: (((azle_wasm_instructions - rust_wasm_instructions) / rust_wasm_instructions) * 100)
    };
}

function calculate_change_multiplier(
    azle_wasm_instructions: number,
    motoko_wasm_instructions: number,
    rust_wasm_instructions: number
): {
    motoko_change_multiplier: number;
    rust_change_multiplier: number;
} {
    return {
        motoko_change_multiplier: (azle_wasm_instructions / motoko_wasm_instructions),
        rust_change_multiplier: (azle_wasm_instructions / rust_wasm_instructions)
    };
}

// TODO also create CSV report
function create_markdown_report(benchmark_results: BenchmarkResult[]): string {
    const title = `# Azle/Rust/Motoko Benchmarks`;

    const description = `These benchmarks were run using the performance counter. The results are the average of ten executions.`;

    const header_names = ['Description', 'Azle Wasm Instructions', 'Rust Wasm Instructions', 'Azle/Rust Percentage Change', 'Azle/Rust Change Multiplier'];

    const header = `| ${header_names.join(' | ')} |`;

    const header_separator = `| ${header_names.map((_) => '---').join(' | ')} |`;

    const data_rows = benchmark_results.map((benchmark_result) => {
        return `| ${benchmark_result.canister_method}${benchmark_result.benchmark_description !== '' ? `: ${benchmark_result.benchmark_description}` : ''} | ${format_number_to_rust(benchmark_result.azle_wasm_instructions.toFixed(0))} | ${format_number_to_rust(benchmark_result.rust_wasm_instructions.toFixed(0))} | ${format_number_to_rust(benchmark_result.rust_percentage_change.toFixed(0))}% | ${format_number_to_rust(benchmark_result.rust_change_multiplier.toFixed(0))}x |`;
    });

    return `${title}\n${description}\n${header}\n${header_separator}\n${data_rows.join('\n')}`;
}

function format_number_to_rust(cycles: string | number | bigint) {
    return cycles
        .toString()
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