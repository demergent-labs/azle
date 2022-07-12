import { nat64 } from '../index';
import { execSync } from 'child_process';
import { writeFileSync } from 'fs';

export type PerfResult = {
    wasm_body_only: nat64;
    wasm_including_prelude: nat64;
};

export type Benchmark = {
    canister_method: string;
    benchmark_description: string;
    args?: any[];
};

export type BenchmarkResult = {
    canister_method: string;
    benchmark_description: string;
    azle_wasm_instructions: WasmPerfType;
    motoko_wasm_instructions: WasmPerfType;
    rust_wasm_instructions: WasmPerfType;
    azle_motoko_change_multiplier: WasmPerfType;
    azle_rust_change_multiplier: WasmPerfType;
    motoko_azle_change_multiplier: WasmPerfType;
    motoko_rust_change_multiplier: WasmPerfType;
    rust_azle_change_multiplier: WasmPerfType;
    rust_motoko_change_multiplier: WasmPerfType;
};

type WasmPerfType = {
    wasm_body_only: number;
    wasm_including_prelude: number;
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

        const azle_wasm_instructions_body_only = benchmark_iteration_results.map((x) => x.azle_wasm_instructions.wasm_body_only);
        const azle_wasm_instructions_including_prelude = benchmark_iteration_results.map((x) => x.azle_wasm_instructions.wasm_including_prelude);
        
        const motoko_wasm_instructions_body_only = benchmark_iteration_results.map((x) => x.motoko_wasm_instructions.wasm_body_only);
        const motoko_wasm_instructions_including_prelude = benchmark_iteration_results.map((x) => x.motoko_wasm_instructions.wasm_including_prelude);

        const rust_wasm_instructions_body_only = benchmark_iteration_results.map((x) => x.rust_wasm_instructions.wasm_body_only);
        const rust_wasm_instructions_including_prelude = benchmark_iteration_results.map((x) => x.rust_wasm_instructions.wasm_including_prelude);

        const azle_motoko_change_multipliers_body_only = benchmark_iteration_results.map((x) => x.azle_motoko_change_multiplier.wasm_body_only);
        const azle_motoko_change_multipliers_including_prelude = benchmark_iteration_results.map((x) => x.azle_motoko_change_multiplier.wasm_including_prelude);
        
        const azle_rust_change_multipliers_body_only = benchmark_iteration_results.map((x) => x.azle_rust_change_multiplier.wasm_body_only);
        const azle_rust_change_multipliers_including_prelude = benchmark_iteration_results.map((x) => x.azle_rust_change_multiplier.wasm_including_prelude);
        
        const motoko_azle_change_multipliers_body_only = benchmark_iteration_results.map((x) => x.motoko_azle_change_multiplier.wasm_body_only);
        const motoko_azle_change_multipliers_including_prelude = benchmark_iteration_results.map((x) => x.motoko_azle_change_multiplier.wasm_including_prelude);
        
        const motoko_rust_change_multipliers_body_only = benchmark_iteration_results.map((x) => x.motoko_rust_change_multiplier.wasm_body_only);
        const motoko_rust_change_multipliers_including_prelude = benchmark_iteration_results.map((x) => x.motoko_rust_change_multiplier.wasm_including_prelude);
        
        const rust_azle_change_multipliers_body_only = benchmark_iteration_results.map((x) => x.rust_azle_change_multiplier.wasm_body_only);
        const rust_azle_change_multipliers_including_prelude = benchmark_iteration_results.map((x) => x.rust_azle_change_multiplier.wasm_including_prelude);
        
        const rust_motoko_change_multipliers_body_only = benchmark_iteration_results.map((x) => x.rust_motoko_change_multiplier.wasm_body_only);
        const rust_motoko_change_multipliers_including_prelude = benchmark_iteration_results.map((x) => x.rust_motoko_change_multiplier.wasm_including_prelude);

        return [
            ...resolved_result,
            {
                canister_method: benchmark.canister_method,
                benchmark_description: benchmark.benchmark_description,
                azle_wasm_instructions: {
                    wasm_body_only: calculate_average(azle_wasm_instructions_body_only),
                    wasm_including_prelude: calculate_average(azle_wasm_instructions_including_prelude)
                },
                motoko_wasm_instructions: {
                    wasm_body_only: calculate_average(motoko_wasm_instructions_body_only),
                    wasm_including_prelude: calculate_average(motoko_wasm_instructions_including_prelude)
                },
                rust_wasm_instructions: {
                    wasm_body_only: calculate_average(rust_wasm_instructions_body_only),
                    wasm_including_prelude: calculate_average(rust_wasm_instructions_including_prelude)
                },
                azle_motoko_change_multiplier: {
                    wasm_body_only: calculate_average(azle_motoko_change_multipliers_body_only),
                    wasm_including_prelude: calculate_average(azle_motoko_change_multipliers_including_prelude)
                },
                azle_rust_change_multiplier: {
                    wasm_body_only: calculate_average(azle_rust_change_multipliers_body_only),
                    wasm_including_prelude: calculate_average(azle_rust_change_multipliers_including_prelude)
                },
                motoko_azle_change_multiplier: {
                    wasm_body_only: calculate_average(motoko_azle_change_multipliers_body_only),
                    wasm_including_prelude: calculate_average(motoko_azle_change_multipliers_including_prelude)
                },
                motoko_rust_change_multiplier: {
                    wasm_body_only: calculate_average(motoko_rust_change_multipliers_body_only),
                    wasm_including_prelude: calculate_average(motoko_rust_change_multipliers_including_prelude)
                },
                rust_azle_change_multiplier: {
                    wasm_body_only: calculate_average(rust_azle_change_multipliers_body_only),
                    wasm_including_prelude: calculate_average(rust_azle_change_multipliers_including_prelude)
                },
                rust_motoko_change_multiplier: {
                    wasm_body_only: calculate_average(rust_motoko_change_multipliers_body_only),
                    wasm_including_prelude: calculate_average(rust_motoko_change_multipliers_including_prelude)
                }
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
    console.log(`benchmark ${canister_method}${benchmark_description !== '' ? `: ${benchmark_description}` : ''}\n`);

    const azle_perf_result: PerfResult = await (azle_canister as any)[canister_method](...args);
    const motoko_perf_result: PerfResult = await (motoko_canister as any)[canister_method](...args);
    const rust_perf_result: PerfResult = await (rust_canister as any)[canister_method](...args);

    const azle_wasm_instructions_body_only = Number(azle_perf_result.wasm_body_only);
    const azle_wasm_instructions_including_prelude = Number(azle_perf_result.wasm_including_prelude);

    const motoko_wasm_instructions_body_only = Number(motoko_perf_result.wasm_body_only);
    const motoko_wasm_instructions_including_prelude = Number(motoko_perf_result.wasm_including_prelude);

    const rust_wasm_instructions_body_only = Number(rust_perf_result.wasm_body_only);
    const rust_wasm_instructions_including_prelude = Number(rust_perf_result.wasm_including_prelude);

    const {
        language2_change_multiplier: azle_motoko_change_multiplier_body_only,
        language3_change_multiplier: azle_rust_change_multiplier_body_only
    } = calculate_change_multiplier(
        azle_wasm_instructions_body_only,
        motoko_wasm_instructions_body_only,
        rust_wasm_instructions_body_only
    );

    const {
        language2_change_multiplier: azle_motoko_change_multiplier_including_prelude,
        language3_change_multiplier: azle_rust_change_multiplier_including_prelude
    } = calculate_change_multiplier(
        azle_wasm_instructions_including_prelude,
        motoko_wasm_instructions_including_prelude,
        rust_wasm_instructions_including_prelude
    );

    const {
        language2_change_multiplier: motoko_azle_change_multiplier_body_only,
        language3_change_multiplier: motoko_rust_change_multiplier_body_only
    } = calculate_change_multiplier(
        motoko_wasm_instructions_body_only,
        azle_wasm_instructions_body_only,
        rust_wasm_instructions_body_only
    );

    const {
        language2_change_multiplier: motoko_azle_change_multiplier_including_prelude,
        language3_change_multiplier: motoko_rust_change_multiplier_including_prelude
    } = calculate_change_multiplier(
        motoko_wasm_instructions_including_prelude,
        azle_wasm_instructions_including_prelude,
        rust_wasm_instructions_including_prelude
    );

    const {
        language2_change_multiplier: rust_azle_change_multiplier_body_only,
        language3_change_multiplier: rust_motoko_change_multiplier_body_only
    } = calculate_change_multiplier(
        rust_wasm_instructions_body_only,
        azle_wasm_instructions_body_only,
        motoko_wasm_instructions_body_only
    );

    const {
        language2_change_multiplier: rust_azle_change_multiplier_including_prelude,
        language3_change_multiplier: rust_motoko_change_multiplier_including_prelude
    } = calculate_change_multiplier(
        rust_wasm_instructions_including_prelude,
        azle_wasm_instructions_including_prelude,
        motoko_wasm_instructions_including_prelude
    );

    return {
        canister_method,
        benchmark_description,
        azle_wasm_instructions: {
            wasm_body_only: azle_wasm_instructions_body_only,
            wasm_including_prelude: azle_wasm_instructions_including_prelude
        },
        motoko_wasm_instructions: {
            wasm_body_only: motoko_wasm_instructions_body_only,
            wasm_including_prelude: motoko_wasm_instructions_including_prelude
        },
        rust_wasm_instructions: {
            wasm_body_only: rust_wasm_instructions_body_only,
            wasm_including_prelude: rust_wasm_instructions_including_prelude
        },
        azle_motoko_change_multiplier: {
            wasm_body_only: azle_motoko_change_multiplier_body_only,
            wasm_including_prelude: azle_motoko_change_multiplier_including_prelude
        },
        azle_rust_change_multiplier: {
            wasm_body_only: azle_rust_change_multiplier_body_only,
            wasm_including_prelude: azle_rust_change_multiplier_including_prelude
        },
        motoko_azle_change_multiplier: {
            wasm_body_only: motoko_azle_change_multiplier_body_only,
            wasm_including_prelude: motoko_azle_change_multiplier_including_prelude
        },
        motoko_rust_change_multiplier: {
            wasm_body_only: motoko_rust_change_multiplier_body_only,
            wasm_including_prelude: motoko_rust_change_multiplier_including_prelude
        },
        rust_azle_change_multiplier: {
            wasm_body_only: rust_azle_change_multiplier_body_only,
            wasm_including_prelude: rust_azle_change_multiplier_including_prelude
        },
        rust_motoko_change_multiplier: {
            wasm_body_only: rust_motoko_change_multiplier_body_only,
            wasm_including_prelude: rust_motoko_change_multiplier_including_prelude
        }
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
    const title = `# Azle/Motoko/Rust Benchmarks`;

    const description = `
- These benchmarks should be considered preliminary (especially the Motoko benchmarks, something seems off with the function prelude)
- These benchmarks were implemented using the performance counter API
    - Performance counter information in [The Internet Computer Interface Spec](https://internetcomputer.org/docs/current/references/ic-interface-spec/#system-api-imports)
    - Performance counter information in [the forum](https://forum.dfinity.org/t/introducing-performance-counter-on-the-internet-computer/14027)
- The results were obtained for each data type by returning performance counter values after performing n iterations of value initializations on the stack and heap in each language
- Each benchmark is the average of 10 runs
- Each benchmark description gives the benchmark function name followed by the number of value initializations performed by the benchmark function
- All benchmark code can be found [here](/benchmark/primitive_ops)
- The following may be inaccurate or missing from the benchmarks as described [here](https://forum.dfinity.org/t/introducing-performance-counter-on-the-internet-computer/14027):
    - Candid serialization/deserialization of function parameters and return types
    - Canister method prologue/epilogue
    - Some Motoko runtime behavior (such as garbage collection)
- You can find a raw CSV file with this data [here](/benchmark/primitive_ops/benchmarks.csv)
- A rough USD cost model for various app scenarios can be found [here](https://docs.google.com/spreadsheets/d/1PQ53R9hYE1fuMB_z-Bl6dyymm7end7rVJ85TvGEh0BQ)

The format for benchmark numbers is (x / y) where:
  - x = Wasm instructions counted only in the function body
  - y = Wasm instructions counted in the function body and the function prelude
    `;

    const header_names = [
        'Description',
        'Azle Wasm Instructions',
        'Motoko Wasm Instructions',
        'Rust Wasm Instructions',
        'Azle/Motoko Change Multiplier',
        'Azle/Rust Change Multiplier',
        'Motoko/Azle Change Multiplier',
        'Motoko/Rust Change Multiplier',
        'Rust/Azle Change Multiplier',
        'Rust/Motoko Change Multiplier'
    ];

    const header = `| ${header_names.join(' | ')} |`;

    const header_separator = `| ${header_names.map((_) => '---').join(' | ')} |`;

    const data_rows = benchmark_results.map((benchmark_result) => {
        const description = `${benchmark_result.canister_method}${benchmark_result.benchmark_description !== '' ? `: ${benchmark_result.benchmark_description}` : ''}`;

        const azle_wasm_instructions = `(${format_number_to_rust(benchmark_result.azle_wasm_instructions.wasm_body_only.toFixed(0))} / ${format_number_to_rust(benchmark_result.azle_wasm_instructions.wasm_including_prelude.toFixed(0))})`;
        const motoko_wasm_instructions = `(${format_number_to_rust(benchmark_result.motoko_wasm_instructions.wasm_body_only.toFixed(0))} / ${format_number_to_rust(benchmark_result.motoko_wasm_instructions.wasm_including_prelude.toFixed(0))})`;
        const rust_wasm_instructions = `(${format_number_to_rust(benchmark_result.rust_wasm_instructions.wasm_body_only.toFixed(0))} / ${format_number_to_rust(benchmark_result.rust_wasm_instructions.wasm_including_prelude.toFixed(0))})`;

        const azle_motoko_change_multiplier = `(${format_number_to_rust(benchmark_result.azle_motoko_change_multiplier.wasm_body_only.toFixed(0))}x / ${format_number_to_rust(benchmark_result.azle_motoko_change_multiplier.wasm_including_prelude.toFixed(0))}x)`;
        const azle_rust_change_multiplier = `(${format_number_to_rust(benchmark_result.azle_rust_change_multiplier.wasm_body_only.toFixed(0))}x / ${format_number_to_rust(benchmark_result.azle_rust_change_multiplier.wasm_including_prelude.toFixed(0))}x)`;

        const motoko_azle_change_multiplier = `(${format_number_to_rust(benchmark_result.motoko_azle_change_multiplier.wasm_body_only.toFixed(0))}x / ${format_number_to_rust(benchmark_result.motoko_azle_change_multiplier.wasm_including_prelude.toFixed(0))}x)`;
        const motoko_rust_change_multiplier = `(${format_number_to_rust(benchmark_result.motoko_rust_change_multiplier.wasm_body_only.toFixed(0))}x / ${format_number_to_rust(benchmark_result.motoko_rust_change_multiplier.wasm_including_prelude.toFixed(0))}x)`;

        const rust_azle_change_multiplier = `(${format_number_to_rust(benchmark_result.rust_azle_change_multiplier.wasm_body_only.toFixed(0))}x / ${format_number_to_rust(benchmark_result.rust_azle_change_multiplier.wasm_including_prelude.toFixed(0))}x)`;
        const rust_motoko_change_multiplier = `(${format_number_to_rust(benchmark_result.rust_motoko_change_multiplier.wasm_body_only.toFixed(0))}x / ${format_number_to_rust(benchmark_result.rust_motoko_change_multiplier.wasm_including_prelude.toFixed(0))}x)`;

        return `| ${description} | ${azle_wasm_instructions} | ${motoko_wasm_instructions} |${rust_wasm_instructions} | ${azle_motoko_change_multiplier} | ${azle_rust_change_multiplier} | ${motoko_azle_change_multiplier} | ${motoko_rust_change_multiplier} | ${rust_azle_change_multiplier} | ${rust_motoko_change_multiplier} |`;
    });

    const average_azle_wasm_instructions_body_only = format_number_to_rust(calculate_average(benchmark_results.map((x) => x.azle_wasm_instructions.wasm_body_only)).toFixed(0));
    const average_azle_wasm_instructions_including_prelude = format_number_to_rust(calculate_average(benchmark_results.map((x) => x.azle_wasm_instructions.wasm_including_prelude)).toFixed(0));
    
    const average_motoko_wasm_instructions_body_only = format_number_to_rust(calculate_average(benchmark_results.map((x) => x.motoko_wasm_instructions.wasm_body_only)).toFixed(0));
    const average_motoko_wasm_instructions_including_prelude = format_number_to_rust(calculate_average(benchmark_results.map((x) => x.motoko_wasm_instructions.wasm_including_prelude)).toFixed(0));
    
    const average_rust_wasm_instructions_body_only = format_number_to_rust(calculate_average(benchmark_results.map((x) => x.rust_wasm_instructions.wasm_body_only)).toFixed(0));
    const average_rust_wasm_instructions_including_prelude = format_number_to_rust(calculate_average(benchmark_results.map((x) => x.rust_wasm_instructions.wasm_including_prelude)).toFixed(0));
    
    const average_azle_motoko_change_multiplier_body_only = format_number_to_rust(calculate_average(benchmark_results.map((x) => x.azle_motoko_change_multiplier.wasm_body_only)).toFixed(0));
    const average_azle_motoko_change_multiplier_including_prelude = format_number_to_rust(calculate_average(benchmark_results.map((x) => x.azle_motoko_change_multiplier.wasm_including_prelude)).toFixed(0));
    
    const average_azle_rust_change_multiplier_body_only  = format_number_to_rust(calculate_average(benchmark_results.map((x) => x.azle_rust_change_multiplier.wasm_body_only)).toFixed(0));
    const average_azle_rust_change_multiplier_including_prelude = format_number_to_rust(calculate_average(benchmark_results.map((x) => x.azle_rust_change_multiplier.wasm_including_prelude)).toFixed(0));
    
    const average_motoko_azle_change_multiplier_body_only  = format_number_to_rust(calculate_average(benchmark_results.map((x) => x.motoko_azle_change_multiplier.wasm_body_only)).toFixed(0));
    const average_motoko_azle_change_multiplier_including_prelude = format_number_to_rust(calculate_average(benchmark_results.map((x) => x.motoko_azle_change_multiplier.wasm_including_prelude)).toFixed(0));
    
    const average_motoko_rust_change_multiplier_body_only  = format_number_to_rust(calculate_average(benchmark_results.map((x) => x.motoko_rust_change_multiplier.wasm_body_only)).toFixed(0));
    const average_motoko_rust_change_multiplier_including_prelude = format_number_to_rust(calculate_average(benchmark_results.map((x) => x.motoko_rust_change_multiplier.wasm_including_prelude)).toFixed(0));
    
    const average_rust_azle_change_multiplier_body_only  = format_number_to_rust(calculate_average(benchmark_results.map((x) => x.rust_azle_change_multiplier.wasm_body_only)).toFixed(0));
    const average_rust_azle_change_multiplier_including_prelude = format_number_to_rust(calculate_average(benchmark_results.map((x) => x.rust_azle_change_multiplier.wasm_including_prelude)).toFixed(0));
    
    const average_rust_motoko_change_multiplier_body_only  = format_number_to_rust(calculate_average(benchmark_results.map((x) => x.rust_motoko_change_multiplier.wasm_body_only)).toFixed(0));
    const average_rust_motoko_change_multiplier_including_prelude = format_number_to_rust(calculate_average(benchmark_results.map((x) => x.rust_motoko_change_multiplier.wasm_including_prelude)).toFixed(0));

    return `${title}\n${description}\n${header}\n${header_separator}\n${data_rows.join('\n')}\n\nAverage Azle Wasm Instructions: (${average_azle_wasm_instructions_body_only} / ${average_azle_wasm_instructions_including_prelude})\n\nAverage Motoko Wasm Instructions: (${average_motoko_wasm_instructions_body_only} / ${average_motoko_wasm_instructions_including_prelude})\n\nAverage Rust Wasm Instructions: (${average_rust_wasm_instructions_body_only} / ${average_rust_wasm_instructions_including_prelude})\n\nAverage Azle/Motoko Change Multiplier: (${average_azle_motoko_change_multiplier_body_only}x / ${average_azle_motoko_change_multiplier_including_prelude}x)\n\nAverage Azle/Rust Change Multiplier: (${average_azle_rust_change_multiplier_body_only}x / ${average_azle_rust_change_multiplier_including_prelude}x)\n\nAverage Motoko/Azle Change Multiplier: (${average_motoko_azle_change_multiplier_body_only}x / ${average_motoko_azle_change_multiplier_including_prelude}x)\n\nAverage Motoko/Rust Change Multiplier: (${average_motoko_rust_change_multiplier_body_only}x / ${average_motoko_rust_change_multiplier_including_prelude}x)\n\nAverage Rust/Azle Change Multiplier: (${average_rust_azle_change_multiplier_body_only}x / ${average_rust_azle_change_multiplier_including_prelude}x)\n\nAverage Rust/Motoko Change Multiplier: (${average_rust_motoko_change_multiplier_body_only}x / ${average_rust_motoko_change_multiplier_including_prelude}x)`;
}

function create_csv_report(benchmark_results: BenchmarkResult[]): string {
    const header_names = [
        'Description',
        'Azle Wasm Instructions (function body only)',
        'Azle Wasm Instructions (function prelude and body)',
        'Motoko Wasm Instructions (function body only)',
        'Motoko Wasm Instructions (function prelude and body)',
        'Rust Wasm Instructions (function body only)',
        'Rust Wasm Instructions (function prelude and body)',
        'Azle/Motoko Change Multiplier (function body only)',
        'Azle/Motoko Change Multiplier (function prelude and body)',
        'Azle/Rust Change Multiplier (function body only)',
        'Azle/Rust Change Multiplier (function prelude and body)',
        'Motoko/Azle Change Multiplier (function body only)',
        'Motoko/Azle Change Multiplier (function prelude and body)',
        'Motoko/Rust Change Multiplier (function body only)',
        'Motoko/Rust Change Multiplier (function prelude and body)',
        'Rust/Azle Change Multiplier (function body only)',
        'Rust/Azle Change Multiplier (function prelude and body)',
        'Rust/Motoko Change Multiplier (function body only)',
        'Rust/Motoko Change Multiplier (function prelude and body)'
    ].join(',');

    const data_rows = benchmark_results.map((benchmark_result) => {
        const description = `${benchmark_result.canister_method}${benchmark_result.benchmark_description !== '' ? `: ${benchmark_result.benchmark_description}` : ''}`;

        const azle_wasm_instructions_body_only = benchmark_result.azle_wasm_instructions.wasm_body_only.toFixed(0);
        const azle_wasm_instructions_including_prelude = benchmark_result.azle_wasm_instructions.wasm_including_prelude.toFixed(0);
        
        const motoko_wasm_instructions_body_only = benchmark_result.motoko_wasm_instructions.wasm_body_only.toFixed(0);
        const motoko_wasm_instructions_including_prelude = benchmark_result.motoko_wasm_instructions.wasm_including_prelude.toFixed(0);
        
        const rust_wasm_instructions_body_only = benchmark_result.rust_wasm_instructions.wasm_body_only.toFixed(0);
        const rust_wasm_instructions_including_prelude = benchmark_result.rust_wasm_instructions.wasm_including_prelude.toFixed(0);

        const azle_motoko_change_multiplier_body_only = benchmark_result.azle_motoko_change_multiplier.wasm_body_only.toFixed(0);
        const azle_motoko_change_multiplier_including_prelude = benchmark_result.azle_motoko_change_multiplier.wasm_including_prelude.toFixed(0);
        
        const azle_rust_change_multiplier_body_only = benchmark_result.azle_rust_change_multiplier.wasm_body_only.toFixed(0);
        const azle_rust_change_multiplier_including_prelude = benchmark_result.azle_rust_change_multiplier.wasm_including_prelude.toFixed(0);

        const motoko_azle_change_multiplier_body_only = benchmark_result.motoko_azle_change_multiplier.wasm_body_only.toFixed(0);
        const motoko_azle_change_multiplier_including_prelude = benchmark_result.motoko_azle_change_multiplier.wasm_including_prelude.toFixed(0);
        
        const motoko_rust_change_multiplier_body_only = benchmark_result.motoko_rust_change_multiplier.wasm_body_only.toFixed(0);
        const motoko_rust_change_multiplier_including_prelude = benchmark_result.motoko_rust_change_multiplier.wasm_including_prelude.toFixed(0);

        const rust_azle_change_multiplier_body_only = benchmark_result.rust_azle_change_multiplier.wasm_body_only.toFixed(0);
        const rust_azle_change_multiplier_including_prelude = benchmark_result.rust_azle_change_multiplier.wasm_including_prelude.toFixed(0);
        
        const rust_motoko_change_multiplier_body_only = benchmark_result.rust_motoko_change_multiplier.wasm_body_only.toFixed(0);
        const rust_motoko_change_multiplier_including_prelude = benchmark_result.rust_motoko_change_multiplier.wasm_including_prelude.toFixed(0);

        return `${description},${azle_wasm_instructions_body_only},${azle_wasm_instructions_including_prelude},${motoko_wasm_instructions_body_only},${motoko_wasm_instructions_including_prelude},${rust_wasm_instructions_body_only},${rust_wasm_instructions_including_prelude},${azle_motoko_change_multiplier_body_only},${azle_motoko_change_multiplier_including_prelude},${azle_rust_change_multiplier_body_only},${azle_rust_change_multiplier_including_prelude},${motoko_azle_change_multiplier_body_only},${motoko_azle_change_multiplier_including_prelude},${motoko_rust_change_multiplier_body_only},${motoko_rust_change_multiplier_including_prelude},${rust_azle_change_multiplier_body_only},${rust_azle_change_multiplier_including_prelude},${rust_motoko_change_multiplier_body_only},${rust_motoko_change_multiplier_including_prelude}`;
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