import { execSync } from 'child_process';
import { writeFileSync } from 'fs';
import { nat64 } from '../index';

export type PerfResult = {
    wasm_body_only: nat64;
    wasm_including_prelude: nat64;
};

export type Benchmark = {
    canister_method: string;
    benchmark_description?: string;
    args?: any[];
};

export type BenchmarkResult = {
    canister_method: string;
    benchmark_description?: string;
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

export type BenchmarkType = 'RETURN_VALUE' | 'GLOBAL_VALUE';

async function run_setup() {
    await new Promise((resolve) => setTimeout(resolve, 5000));

    execSync(`dfx canister create azle`, {
        stdio: 'inherit'
    });

    execSync(`dfx canister create motoko`, {
        stdio: 'inherit'
    });

    execSync(`dfx canister create rust`, {
        stdio: 'inherit'
    });

    execSync(`dfx canister uninstall-code azle || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx canister uninstall-code motoko || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx canister uninstall-code rust || true`, {
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
    benchmark_type: BenchmarkType,
    benchmarks: Benchmark[],
    create_actor_azle: any,
    create_actor_motoko: any,
    create_actor_rust: any,
    num_benchmark_iterations: number = 10,
    output_file: string = 'benchmarks',
    setup: boolean = process.argv[2] !== 'no-setup'
): Promise<BenchmarkResult[]> {
    if (setup === true) {
        await run_setup();
    }

    const azle_canister = create_actor_azle(
        execSync('dfx canister id azle').toString().trim(),
        {
            agentOptions: {
                host: 'http://127.0.0.1:8000'
            }
        }
    );

    const motoko_canister = create_actor_motoko(
        execSync('dfx canister id motoko').toString().trim(),
        {
            agentOptions: {
                host: 'http://127.0.0.1:8000'
            }
        }
    );

    const rust_canister = create_actor_rust(
        execSync('dfx canister id rust').toString().trim(),
        {
            agentOptions: {
                host: 'http://127.0.0.1:8000'
            }
        }
    );

    const benchmark_promises: BenchmarkResult[] = await benchmarks.reduce(
        async (result: Promise<BenchmarkResult[]>, benchmark) => {
            const resolved_result = await result;

            console.log(
                `Starting ${num_benchmark_iterations} run${
                    num_benchmark_iterations === 1 ? '' : 's'
                } of benchmark ${benchmark.canister_method}${
                    benchmark.benchmark_description !== undefined
                        ? `: ${benchmark.benchmark_description}`
                        : ''
                }\n`
            );

            // TODO I am doing this serially on purpose to overcome race conditions with GLOBAL_VALUE retrieval
            // TODO Just leaving this here because if done concurrently we could speed things up
            const benchmark_iteration_results = await new Array(
                num_benchmark_iterations
            )
                .fill(0)
                .reduce(async (result: Promise<BenchmarkResult[]>) => {
                    const resolved_result = await result;

                    return [
                        ...resolved_result,
                        await run_benchmark(
                            benchmark_type,
                            benchmark.canister_method,
                            azle_canister,
                            motoko_canister,
                            rust_canister,
                            benchmark.benchmark_description,
                            benchmark.args
                        )
                    ];
                }, Promise.resolve([]));

            const azle_wasm_instructions_body_only =
                benchmark_iteration_results.map(
                    (x) => x.azle_wasm_instructions.wasm_body_only
                );
            const azle_wasm_instructions_including_prelude =
                benchmark_iteration_results.map(
                    (x) => x.azle_wasm_instructions.wasm_including_prelude
                );

            const motoko_wasm_instructions_body_only =
                benchmark_iteration_results.map(
                    (x) => x.motoko_wasm_instructions.wasm_body_only
                );
            const motoko_wasm_instructions_including_prelude =
                benchmark_iteration_results.map(
                    (x) => x.motoko_wasm_instructions.wasm_including_prelude
                );

            const rust_wasm_instructions_body_only =
                benchmark_iteration_results.map(
                    (x) => x.rust_wasm_instructions.wasm_body_only
                );
            const rust_wasm_instructions_including_prelude =
                benchmark_iteration_results.map(
                    (x) => x.rust_wasm_instructions.wasm_including_prelude
                );

            const azle_motoko_change_multipliers_body_only =
                benchmark_iteration_results.map(
                    (x) => x.azle_motoko_change_multiplier.wasm_body_only
                );
            const azle_motoko_change_multipliers_including_prelude =
                benchmark_iteration_results.map(
                    (x) =>
                        x.azle_motoko_change_multiplier.wasm_including_prelude
                );

            const azle_rust_change_multipliers_body_only =
                benchmark_iteration_results.map(
                    (x) => x.azle_rust_change_multiplier.wasm_body_only
                );
            const azle_rust_change_multipliers_including_prelude =
                benchmark_iteration_results.map(
                    (x) => x.azle_rust_change_multiplier.wasm_including_prelude
                );

            const motoko_azle_change_multipliers_body_only =
                benchmark_iteration_results.map(
                    (x) => x.motoko_azle_change_multiplier.wasm_body_only
                );
            const motoko_azle_change_multipliers_including_prelude =
                benchmark_iteration_results.map(
                    (x) =>
                        x.motoko_azle_change_multiplier.wasm_including_prelude
                );

            const motoko_rust_change_multipliers_body_only =
                benchmark_iteration_results.map(
                    (x) => x.motoko_rust_change_multiplier.wasm_body_only
                );
            const motoko_rust_change_multipliers_including_prelude =
                benchmark_iteration_results.map(
                    (x) =>
                        x.motoko_rust_change_multiplier.wasm_including_prelude
                );

            const rust_azle_change_multipliers_body_only =
                benchmark_iteration_results.map(
                    (x) => x.rust_azle_change_multiplier.wasm_body_only
                );
            const rust_azle_change_multipliers_including_prelude =
                benchmark_iteration_results.map(
                    (x) => x.rust_azle_change_multiplier.wasm_including_prelude
                );

            const rust_motoko_change_multipliers_body_only =
                benchmark_iteration_results.map(
                    (x) => x.rust_motoko_change_multiplier.wasm_body_only
                );
            const rust_motoko_change_multipliers_including_prelude =
                benchmark_iteration_results.map(
                    (x) =>
                        x.rust_motoko_change_multiplier.wasm_including_prelude
                );

            return [
                ...resolved_result,
                {
                    canister_method: benchmark.canister_method,
                    benchmark_description: benchmark.benchmark_description,
                    azle_wasm_instructions: {
                        wasm_body_only: calculate_average(
                            azle_wasm_instructions_body_only
                        ),
                        wasm_including_prelude: calculate_average(
                            azle_wasm_instructions_including_prelude
                        )
                    },
                    motoko_wasm_instructions: {
                        wasm_body_only: calculate_average(
                            motoko_wasm_instructions_body_only
                        ),
                        wasm_including_prelude: calculate_average(
                            motoko_wasm_instructions_including_prelude
                        )
                    },
                    rust_wasm_instructions: {
                        wasm_body_only: calculate_average(
                            rust_wasm_instructions_body_only
                        ),
                        wasm_including_prelude: calculate_average(
                            rust_wasm_instructions_including_prelude
                        )
                    },
                    azle_motoko_change_multiplier: {
                        wasm_body_only: calculate_average(
                            azle_motoko_change_multipliers_body_only
                        ),
                        wasm_including_prelude: calculate_average(
                            azle_motoko_change_multipliers_including_prelude
                        )
                    },
                    azle_rust_change_multiplier: {
                        wasm_body_only: calculate_average(
                            azle_rust_change_multipliers_body_only
                        ),
                        wasm_including_prelude: calculate_average(
                            azle_rust_change_multipliers_including_prelude
                        )
                    },
                    motoko_azle_change_multiplier: {
                        wasm_body_only: calculate_average(
                            motoko_azle_change_multipliers_body_only
                        ),
                        wasm_including_prelude: calculate_average(
                            motoko_azle_change_multipliers_including_prelude
                        )
                    },
                    motoko_rust_change_multiplier: {
                        wasm_body_only: calculate_average(
                            motoko_rust_change_multipliers_body_only
                        ),
                        wasm_including_prelude: calculate_average(
                            motoko_rust_change_multipliers_including_prelude
                        )
                    },
                    rust_azle_change_multiplier: {
                        wasm_body_only: calculate_average(
                            rust_azle_change_multipliers_body_only
                        ),
                        wasm_including_prelude: calculate_average(
                            rust_azle_change_multipliers_including_prelude
                        )
                    },
                    rust_motoko_change_multiplier: {
                        wasm_body_only: calculate_average(
                            rust_motoko_change_multipliers_body_only
                        ),
                        wasm_including_prelude: calculate_average(
                            rust_motoko_change_multipliers_including_prelude
                        )
                    }
                }
            ];
        },
        Promise.resolve([])
    );

    const benchmark_results: BenchmarkResult[] = await Promise.all(
        benchmark_promises
    );

    if (output_file !== undefined) {
        const markdown_report = create_markdown_report(
            benchmark_results,
            num_benchmark_iterations,
            output_file
        );
        const csv_report = create_csv_report(benchmark_results);
        writeFileSync(`${output_file}.md`, markdown_report);
        writeFileSync(`${output_file}.csv`, csv_report);
    }

    return benchmark_results;
}

async function run_benchmark(
    benchmark_type: BenchmarkType,
    canister_method: string,
    azle_canister: any,
    motoko_canister: any,
    rust_canister: any,
    benchmark_description: string = canister_method,
    args: any[] = []
): Promise<BenchmarkResult> {
    const results = await Promise.all([
        get_perf_result(benchmark_type, azle_canister, canister_method, args),
        get_perf_result(benchmark_type, motoko_canister, canister_method, args),
        get_perf_result(benchmark_type, rust_canister, canister_method, args)
    ]);

    const azle_perf_result = results[0];
    const motoko_perf_result = results[1];
    const rust_perf_result = results[2];

    const azle_wasm_instructions_body_only = Number(
        azle_perf_result.wasm_body_only
    );
    const azle_wasm_instructions_including_prelude = Number(
        azle_perf_result.wasm_including_prelude
    );

    const motoko_wasm_instructions_body_only = Number(
        motoko_perf_result.wasm_body_only
    );
    const motoko_wasm_instructions_including_prelude = Number(
        motoko_perf_result.wasm_including_prelude
    );

    const rust_wasm_instructions_body_only = Number(
        rust_perf_result.wasm_body_only
    );
    const rust_wasm_instructions_including_prelude = Number(
        rust_perf_result.wasm_including_prelude
    );

    const {
        language2_change_multiplier: azle_motoko_change_multiplier_body_only,
        language3_change_multiplier: azle_rust_change_multiplier_body_only
    } = calculate_change_multiplier(
        azle_wasm_instructions_body_only,
        motoko_wasm_instructions_body_only,
        rust_wasm_instructions_body_only
    );

    const {
        language2_change_multiplier:
            azle_motoko_change_multiplier_including_prelude,
        language3_change_multiplier:
            azle_rust_change_multiplier_including_prelude
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
        language2_change_multiplier:
            motoko_azle_change_multiplier_including_prelude,
        language3_change_multiplier:
            motoko_rust_change_multiplier_including_prelude
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
        language2_change_multiplier:
            rust_azle_change_multiplier_including_prelude,
        language3_change_multiplier:
            rust_motoko_change_multiplier_including_prelude
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
            wasm_including_prelude:
                azle_motoko_change_multiplier_including_prelude
        },
        azle_rust_change_multiplier: {
            wasm_body_only: azle_rust_change_multiplier_body_only,
            wasm_including_prelude:
                azle_rust_change_multiplier_including_prelude
        },
        motoko_azle_change_multiplier: {
            wasm_body_only: motoko_azle_change_multiplier_body_only,
            wasm_including_prelude:
                motoko_azle_change_multiplier_including_prelude
        },
        motoko_rust_change_multiplier: {
            wasm_body_only: motoko_rust_change_multiplier_body_only,
            wasm_including_prelude:
                motoko_rust_change_multiplier_including_prelude
        },
        rust_azle_change_multiplier: {
            wasm_body_only: rust_azle_change_multiplier_body_only,
            wasm_including_prelude:
                rust_azle_change_multiplier_including_prelude
        },
        rust_motoko_change_multiplier: {
            wasm_body_only: rust_motoko_change_multiplier_body_only,
            wasm_including_prelude:
                rust_motoko_change_multiplier_including_prelude
        }
    };
}

async function get_perf_result(
    benchmark_type: BenchmarkType,
    canister: any,
    canister_method: string,
    args: any[]
): Promise<PerfResult> {
    if (benchmark_type === 'RETURN_VALUE') {
        const perf_result: PerfResult = await (canister as any)[
            canister_method
        ](...args);

        return perf_result;
    } else {
        await (canister as any)[canister_method](...args);

        const perf_result_opt: PerfResult[] = await (
            canister as any
        ).get_perf_result();

        if (perf_result_opt.length === 0) {
            throw new Error(`PerfResult was not set`);
        }

        return perf_result_opt[0];
    }
}

export function calculate_change_multiplier(
    language1_wasm_instructions: number,
    language2_wasm_instructions: number,
    language3_wasm_instructions: number
): {
    language2_change_multiplier: number;
    language3_change_multiplier: number;
} {
    return {
        language2_change_multiplier:
            language1_wasm_instructions >= language2_wasm_instructions
                ? language1_wasm_instructions / language2_wasm_instructions
                : (language2_wasm_instructions / language1_wasm_instructions) *
                  -1,
        language3_change_multiplier:
            language1_wasm_instructions >= language3_wasm_instructions
                ? language1_wasm_instructions / language3_wasm_instructions
                : (language3_wasm_instructions / language1_wasm_instructions) *
                  -1
    };
}

function create_markdown_report(
    benchmark_results: BenchmarkResult[],
    num_benchmark_iterations: number,
    output_file: string
): string {
    const title = `# Azle/Motoko/Rust Benchmarks`;

    const description = `
- These benchmarks should be considered preliminary (especially the Motoko benchmarks, something seems off with the function prelude)
- These benchmarks were implemented using the performance counter API
    - Performance counter information in [The Internet Computer Interface Spec](https://internetcomputer.org/docs/current/references/ic-interface-spec/#system-api-imports)
    - Performance counter information in [the forum](https://forum.dfinity.org/t/introducing-performance-counter-on-the-internet-computer/14027)
- Each benchmark is the average of ${num_benchmark_iterations} run${
        num_benchmark_iterations === 1 ? '' : 's'
    }
- Each benchmark description gives the benchmark function name followed by the number of value initializations performed by the benchmark function
- The following may be inaccurate or missing from the benchmarks as described [here](https://forum.dfinity.org/t/introducing-performance-counter-on-the-internet-computer/14027):
    - Candid serialization/deserialization of function parameters and return types
    - Canister method prologue/epilogue
    - Some Motoko runtime behavior (such as garbage collection)
- You can find a raw CSV file with this data [here](./${output_file}.csv)
- A rough USD cost model for various app scenarios can be found [here](https://docs.google.com/spreadsheets/d/1PQ53R9hYE1fuMB_z-Bl6dyymm7end7rVJ85TvGEh0BQ)

The format for benchmark numbers is (x / y) where:
  - x = Wasm instructions counted only in the function body
  - y = Wasm instructions counted in the function body and the function prelude
`;

    const average_azle_wasm_instructions_body_only = format_number_to_rust(
        calculate_average(
            benchmark_results.map(
                (x) => x.azle_wasm_instructions.wasm_body_only
            )
        ).toFixed(0)
    );
    const average_azle_wasm_instructions_including_prelude =
        format_number_to_rust(
            calculate_average(
                benchmark_results.map(
                    (x) => x.azle_wasm_instructions.wasm_including_prelude
                )
            ).toFixed(0)
        );

    const average_motoko_wasm_instructions_body_only = format_number_to_rust(
        calculate_average(
            benchmark_results.map(
                (x) => x.motoko_wasm_instructions.wasm_body_only
            )
        ).toFixed(0)
    );
    const average_motoko_wasm_instructions_including_prelude =
        format_number_to_rust(
            calculate_average(
                benchmark_results.map(
                    (x) => x.motoko_wasm_instructions.wasm_including_prelude
                )
            ).toFixed(0)
        );

    const average_rust_wasm_instructions_body_only = format_number_to_rust(
        calculate_average(
            benchmark_results.map(
                (x) => x.rust_wasm_instructions.wasm_body_only
            )
        ).toFixed(0)
    );
    const average_rust_wasm_instructions_including_prelude =
        format_number_to_rust(
            calculate_average(
                benchmark_results.map(
                    (x) => x.rust_wasm_instructions.wasm_including_prelude
                )
            ).toFixed(0)
        );

    const average_azle_motoko_change_multiplier_body_only =
        format_number_to_rust(
            calculate_average(
                benchmark_results.map(
                    (x) => x.azle_motoko_change_multiplier.wasm_body_only
                )
            ).toFixed(0)
        );
    const average_azle_motoko_change_multiplier_including_prelude =
        format_number_to_rust(
            calculate_average(
                benchmark_results.map(
                    (x) =>
                        x.azle_motoko_change_multiplier.wasm_including_prelude
                )
            ).toFixed(0)
        );

    const average_azle_rust_change_multiplier_body_only = format_number_to_rust(
        calculate_average(
            benchmark_results.map(
                (x) => x.azle_rust_change_multiplier.wasm_body_only
            )
        ).toFixed(0)
    );
    const average_azle_rust_change_multiplier_including_prelude =
        format_number_to_rust(
            calculate_average(
                benchmark_results.map(
                    (x) => x.azle_rust_change_multiplier.wasm_including_prelude
                )
            ).toFixed(0)
        );

    const average_motoko_azle_change_multiplier_body_only =
        format_number_to_rust(
            calculate_average(
                benchmark_results.map(
                    (x) => x.motoko_azle_change_multiplier.wasm_body_only
                )
            ).toFixed(0)
        );
    const average_motoko_azle_change_multiplier_including_prelude =
        format_number_to_rust(
            calculate_average(
                benchmark_results.map(
                    (x) =>
                        x.motoko_azle_change_multiplier.wasm_including_prelude
                )
            ).toFixed(0)
        );

    const average_motoko_rust_change_multiplier_body_only =
        format_number_to_rust(
            calculate_average(
                benchmark_results.map(
                    (x) => x.motoko_rust_change_multiplier.wasm_body_only
                )
            ).toFixed(0)
        );
    const average_motoko_rust_change_multiplier_including_prelude =
        format_number_to_rust(
            calculate_average(
                benchmark_results.map(
                    (x) =>
                        x.motoko_rust_change_multiplier.wasm_including_prelude
                )
            ).toFixed(0)
        );

    const average_rust_azle_change_multiplier_body_only = format_number_to_rust(
        calculate_average(
            benchmark_results.map(
                (x) => x.rust_azle_change_multiplier.wasm_body_only
            )
        ).toFixed(0)
    );
    const average_rust_azle_change_multiplier_including_prelude =
        format_number_to_rust(
            calculate_average(
                benchmark_results.map(
                    (x) => x.rust_azle_change_multiplier.wasm_including_prelude
                )
            ).toFixed(0)
        );

    const average_rust_motoko_change_multiplier_body_only =
        format_number_to_rust(
            calculate_average(
                benchmark_results.map(
                    (x) => x.rust_motoko_change_multiplier.wasm_body_only
                )
            ).toFixed(0)
        );
    const average_rust_motoko_change_multiplier_including_prelude =
        format_number_to_rust(
            calculate_average(
                benchmark_results.map(
                    (x) =>
                        x.rust_motoko_change_multiplier.wasm_including_prelude
                )
            ).toFixed(0)
        );

    const averages_title = `## Averages`;
    const averages_header_names = [
        'Azle Wasm Instructions',
        'Motoko Wasm Instructions',
        'Rust Wasm Instructions',
        'Azle/Motoko Change Multiplier',
        'Azle/Rust Change Multiplier',
        'Motoko/Azle Change Multiplier',
        'Motoko/Rust Change Multiplier',
        'Average Rust/Azle Change Multiplier',
        'Rust/Motoko Change Multiplier'
    ];
    const averages_header = `| ${averages_header_names.join(' | ')} |`;
    const averages_header_separator = `| ${averages_header_names
        .map((_) => '---')
        .join(' | ')} |`;
    const average_rows = [
        `(${average_azle_wasm_instructions_body_only} / ${average_azle_wasm_instructions_including_prelude})`,
        `(${average_motoko_wasm_instructions_body_only} / ${average_motoko_wasm_instructions_including_prelude})`,
        `(${average_rust_wasm_instructions_body_only} / ${average_rust_wasm_instructions_including_prelude})`,
        `(${average_azle_motoko_change_multiplier_body_only}x / ${average_azle_motoko_change_multiplier_including_prelude}x)`,
        `(${average_azle_rust_change_multiplier_body_only}x / ${average_azle_rust_change_multiplier_including_prelude}x)`,
        `(${average_motoko_azle_change_multiplier_body_only}x / ${average_motoko_azle_change_multiplier_including_prelude}x)`,
        `(${average_motoko_rust_change_multiplier_body_only}x / ${average_motoko_rust_change_multiplier_including_prelude}x)`,
        `(${average_rust_azle_change_multiplier_body_only}x / ${average_rust_azle_change_multiplier_including_prelude}x)`,
        `(${average_rust_motoko_change_multiplier_body_only}x / ${average_rust_motoko_change_multiplier_including_prelude}x)`
    ];

    const primitive_ops_header_names = [
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

    const primitive_ops_header = `| ${primitive_ops_header_names.join(
        ' | '
    )} |`;

    const primitive_ops_header_separator = `| ${primitive_ops_header_names
        .map((_) => '---')
        .join(' | ')} |`;

    const primitive_ops_data_rows = benchmark_results.map(
        (benchmark_result) => {
            const description = `${benchmark_result.canister_method}${
                benchmark_result.benchmark_description !== undefined
                    ? `: ${benchmark_result.benchmark_description}`
                    : ''
            }`;

            const azle_wasm_instructions = `(${format_number_to_rust(
                benchmark_result.azle_wasm_instructions.wasm_body_only.toFixed(
                    0
                )
            )} / ${format_number_to_rust(
                benchmark_result.azle_wasm_instructions.wasm_including_prelude.toFixed(
                    0
                )
            )})`;
            const motoko_wasm_instructions = `(${format_number_to_rust(
                benchmark_result.motoko_wasm_instructions.wasm_body_only.toFixed(
                    0
                )
            )} / ${format_number_to_rust(
                benchmark_result.motoko_wasm_instructions.wasm_including_prelude.toFixed(
                    0
                )
            )})`;
            const rust_wasm_instructions = `(${format_number_to_rust(
                benchmark_result.rust_wasm_instructions.wasm_body_only.toFixed(
                    0
                )
            )} / ${format_number_to_rust(
                benchmark_result.rust_wasm_instructions.wasm_including_prelude.toFixed(
                    0
                )
            )})`;

            const azle_motoko_change_multiplier = `(${format_number_to_rust(
                benchmark_result.azle_motoko_change_multiplier.wasm_body_only.toFixed(
                    0
                )
            )}x / ${format_number_to_rust(
                benchmark_result.azle_motoko_change_multiplier.wasm_including_prelude.toFixed(
                    0
                )
            )}x)`;
            const azle_rust_change_multiplier = `(${format_number_to_rust(
                benchmark_result.azle_rust_change_multiplier.wasm_body_only.toFixed(
                    0
                )
            )}x / ${format_number_to_rust(
                benchmark_result.azle_rust_change_multiplier.wasm_including_prelude.toFixed(
                    0
                )
            )}x)`;

            const motoko_azle_change_multiplier = `(${format_number_to_rust(
                benchmark_result.motoko_azle_change_multiplier.wasm_body_only.toFixed(
                    0
                )
            )}x / ${format_number_to_rust(
                benchmark_result.motoko_azle_change_multiplier.wasm_including_prelude.toFixed(
                    0
                )
            )}x)`;
            const motoko_rust_change_multiplier = `(${format_number_to_rust(
                benchmark_result.motoko_rust_change_multiplier.wasm_body_only.toFixed(
                    0
                )
            )}x / ${format_number_to_rust(
                benchmark_result.motoko_rust_change_multiplier.wasm_including_prelude.toFixed(
                    0
                )
            )}x)`;

            const rust_azle_change_multiplier = `(${format_number_to_rust(
                benchmark_result.rust_azle_change_multiplier.wasm_body_only.toFixed(
                    0
                )
            )}x / ${format_number_to_rust(
                benchmark_result.rust_azle_change_multiplier.wasm_including_prelude.toFixed(
                    0
                )
            )}x)`;
            const rust_motoko_change_multiplier = `(${format_number_to_rust(
                benchmark_result.rust_motoko_change_multiplier.wasm_body_only.toFixed(
                    0
                )
            )}x / ${format_number_to_rust(
                benchmark_result.rust_motoko_change_multiplier.wasm_including_prelude.toFixed(
                    0
                )
            )}x)`;

            return `| ${description} | ${azle_wasm_instructions} | ${motoko_wasm_instructions} |${rust_wasm_instructions} | ${azle_motoko_change_multiplier} | ${azle_rust_change_multiplier} | ${motoko_azle_change_multiplier} | ${motoko_rust_change_multiplier} | ${rust_azle_change_multiplier} | ${rust_motoko_change_multiplier} |`;
        }
    );

    return `${title}\n${description}\n\n${averages_title}\n\n${averages_header}\n${averages_header_separator}\n| ${average_rows.join(
        '|'
    )} |\n\n## Benchmarks\n\n${primitive_ops_header}\n${primitive_ops_header_separator}\n${primitive_ops_data_rows.join(
        '\n'
    )}`;
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

    const data_rows = benchmark_results
        .map((benchmark_result) => {
            const description = `${benchmark_result.canister_method}${
                benchmark_result.benchmark_description !== undefined
                    ? `: ${benchmark_result.benchmark_description}`
                    : ''
            }`;

            const azle_wasm_instructions_body_only =
                benchmark_result.azle_wasm_instructions.wasm_body_only.toFixed(
                    0
                );
            const azle_wasm_instructions_including_prelude =
                benchmark_result.azle_wasm_instructions.wasm_including_prelude.toFixed(
                    0
                );

            const motoko_wasm_instructions_body_only =
                benchmark_result.motoko_wasm_instructions.wasm_body_only.toFixed(
                    0
                );
            const motoko_wasm_instructions_including_prelude =
                benchmark_result.motoko_wasm_instructions.wasm_including_prelude.toFixed(
                    0
                );

            const rust_wasm_instructions_body_only =
                benchmark_result.rust_wasm_instructions.wasm_body_only.toFixed(
                    0
                );
            const rust_wasm_instructions_including_prelude =
                benchmark_result.rust_wasm_instructions.wasm_including_prelude.toFixed(
                    0
                );

            const azle_motoko_change_multiplier_body_only =
                benchmark_result.azle_motoko_change_multiplier.wasm_body_only.toFixed(
                    0
                );
            const azle_motoko_change_multiplier_including_prelude =
                benchmark_result.azle_motoko_change_multiplier.wasm_including_prelude.toFixed(
                    0
                );

            const azle_rust_change_multiplier_body_only =
                benchmark_result.azle_rust_change_multiplier.wasm_body_only.toFixed(
                    0
                );
            const azle_rust_change_multiplier_including_prelude =
                benchmark_result.azle_rust_change_multiplier.wasm_including_prelude.toFixed(
                    0
                );

            const motoko_azle_change_multiplier_body_only =
                benchmark_result.motoko_azle_change_multiplier.wasm_body_only.toFixed(
                    0
                );
            const motoko_azle_change_multiplier_including_prelude =
                benchmark_result.motoko_azle_change_multiplier.wasm_including_prelude.toFixed(
                    0
                );

            const motoko_rust_change_multiplier_body_only =
                benchmark_result.motoko_rust_change_multiplier.wasm_body_only.toFixed(
                    0
                );
            const motoko_rust_change_multiplier_including_prelude =
                benchmark_result.motoko_rust_change_multiplier.wasm_including_prelude.toFixed(
                    0
                );

            const rust_azle_change_multiplier_body_only =
                benchmark_result.rust_azle_change_multiplier.wasm_body_only.toFixed(
                    0
                );
            const rust_azle_change_multiplier_including_prelude =
                benchmark_result.rust_azle_change_multiplier.wasm_including_prelude.toFixed(
                    0
                );

            const rust_motoko_change_multiplier_body_only =
                benchmark_result.rust_motoko_change_multiplier.wasm_body_only.toFixed(
                    0
                );
            const rust_motoko_change_multiplier_including_prelude =
                benchmark_result.rust_motoko_change_multiplier.wasm_including_prelude.toFixed(
                    0
                );

            return `${description},${azle_wasm_instructions_body_only},${azle_wasm_instructions_including_prelude},${motoko_wasm_instructions_body_only},${motoko_wasm_instructions_including_prelude},${rust_wasm_instructions_body_only},${rust_wasm_instructions_including_prelude},${azle_motoko_change_multiplier_body_only},${azle_motoko_change_multiplier_including_prelude},${azle_rust_change_multiplier_body_only},${azle_rust_change_multiplier_including_prelude},${motoko_azle_change_multiplier_body_only},${motoko_azle_change_multiplier_including_prelude},${motoko_rust_change_multiplier_body_only},${motoko_rust_change_multiplier_including_prelude},${rust_azle_change_multiplier_body_only},${rust_azle_change_multiplier_including_prelude},${rust_motoko_change_multiplier_body_only},${rust_motoko_change_multiplier_including_prelude}`;
        })
        .join('\n');

    return `${header_names}\n${data_rows}`;
}

function format_number_to_rust(cycles: string | number | bigint) {
    const negative = cycles.toString()[0] === '-';

    return (
        (negative ? '-' : '') +
        cycles
            .toString()
            .replace('-', '')
            .split('')
            .reverse()
            .reduce((result, char, index) => {
                return `${result}${
                    index !== 0 && index % 3 === 0 ? '_' : ''
                }${char}`;
            }, '')
            .split('')
            .reverse()
            .join('')
    );
}

function calculate_average(elements: number[]): number {
    return (
        elements.reduce((sum, element) => {
            return sum + element;
        }, 0) / elements.length
    );
}
