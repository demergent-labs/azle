import { execSync } from 'child_process';
import { create_csv_report } from './csv';
import { writeFileSync } from 'fs';
import { nat64 } from '../src/lib';
import { create_markdown_report } from './markdown';
import { run_setup } from './setup';

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

export async function run_benchmarks(
    benchmark_type: BenchmarkType,
    benchmarks: Benchmark[],
    create_actor_azle: any,
    create_actor_motoko: any,
    create_actor_rust: any,
    num_benchmark_iterations: number = 10,
    output_file: string = 'benchmarks',
    argument?: string,
    setup: boolean = process.argv[2] !== 'no-setup'
): Promise<BenchmarkResult[]> {
    if (setup === true) {
        await run_setup(argument);
    }

    const { azle_canister, motoko_canister, rust_canister } =
        create_canister_actors(
            create_actor_azle,
            create_actor_motoko,
            create_actor_rust
        );

    const benchmark_results = await get_benchmark_results(
        benchmark_type,
        benchmarks,
        num_benchmark_iterations,
        azle_canister,
        motoko_canister,
        rust_canister
    );

    write_reports_to_file(
        output_file,
        benchmark_results,
        num_benchmark_iterations
    );

    return benchmark_results;
}

function create_canister_actors(
    create_actor_azle: any,
    create_actor_motoko: any,
    create_actor_rust: any
): {
    azle_canister: any;
    motoko_canister: any;
    rust_canister: any;
} {
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

    return {
        azle_canister,
        motoko_canister,
        rust_canister
    };
}

async function get_benchmark_results(
    benchmark_type: BenchmarkType,
    benchmarks: Benchmark[],
    num_benchmark_iterations: number,
    azle_canister: any,
    motoko_canister: any,
    rust_canister: any
): Promise<BenchmarkResult[]> {
    const benchmark_results: BenchmarkResult[] = await benchmarks.reduce(
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
    const perf_results = await Promise.all([
        get_perf_result(benchmark_type, azle_canister, canister_method, args),
        get_perf_result(benchmark_type, motoko_canister, canister_method, args),
        get_perf_result(benchmark_type, rust_canister, canister_method, args)
    ]);

    const azle_perf_result = perf_results[0];
    const motoko_perf_result = perf_results[1];
    const rust_perf_result = perf_results[2];

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

function write_reports_to_file(
    output_file: string,
    benchmark_results: BenchmarkResult[],
    num_benchmark_iterations: number
) {
    const markdown_report = create_markdown_report(
        benchmark_results,
        num_benchmark_iterations,
        output_file
    );
    const csv_report = create_csv_report(benchmark_results);

    writeFileSync(`${output_file}.md`, markdown_report);
    writeFileSync(`${output_file}.csv`, csv_report);
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

export function calculate_average(elements: number[]): number {
    return (
        elements.reduce((sum, element) => {
            return sum + element;
        }, 0) / elements.length
    );
}
