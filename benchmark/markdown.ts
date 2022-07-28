import { BenchmarkResult, calculate_average } from './index';

export function create_markdown_report(
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
        'Rust/Azle Change Multiplier',
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
    )}\n`;
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
