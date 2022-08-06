import { BenchmarkResult, calculate_average } from './index';
import { get_usd_cost_estimates } from './usd';
import { USDCostEstimates } from './usd/usd_cost_estimate';
import {
    USAGE_CONFIG_HEAVY_QUERY_HEAVY,
    USAGE_CONFIG_HEAVY_QUERY_UPDATE_EVEN,
    USAGE_CONFIG_HEAVY_UPDATE_HEAVY,
    USAGE_CONFIG_LIGHT_QUERY_HEAVY,
    USAGE_CONFIG_LIGHT_QUERY_UPDATE_EVEN,
    USAGE_CONFIG_LIGHT_UPDATE_HEAVY,
    USAGE_CONFIG_MODERATE_QUERY_HEAVY,
    USAGE_CONFIG_MODERATE_QUERY_UPDATE_EVEN,
    USAGE_CONFIG_MODERATE_UPDATE_HEAVY
} from './usd/usage_config';

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
    const average_azle_wasm_instructions_including_prelude = calculate_average(
        benchmark_results.map(
            (x) => x.azle_wasm_instructions.wasm_including_prelude
        )
    );
    const average_azle_wasm_instructions_including_prelude_string =
        format_number_to_rust(
            average_azle_wasm_instructions_including_prelude.toFixed(0)
        );

    const average_motoko_wasm_instructions_body_only = format_number_to_rust(
        calculate_average(
            benchmark_results.map(
                (x) => x.motoko_wasm_instructions.wasm_body_only
            )
        ).toFixed(0)
    );
    const average_motoko_wasm_instructions_including_prelude =
        calculate_average(
            benchmark_results.map(
                (x) => x.motoko_wasm_instructions.wasm_including_prelude
            )
        );
    const average_motoko_wasm_instructions_including_prelude_string =
        format_number_to_rust(
            average_motoko_wasm_instructions_including_prelude.toFixed(0)
        );

    const average_rust_wasm_instructions_body_only = format_number_to_rust(
        calculate_average(
            benchmark_results.map(
                (x) => x.rust_wasm_instructions.wasm_body_only
            )
        ).toFixed(0)
    );
    const average_rust_wasm_instructions_including_prelude = calculate_average(
        benchmark_results.map(
            (x) => x.rust_wasm_instructions.wasm_including_prelude
        )
    );
    const average_rust_wasm_instructions_including_prelude_string =
        format_number_to_rust(
            average_rust_wasm_instructions_including_prelude.toFixed(0)
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

    const usd_cost_estimates_string = generate_usd_cost_estimates_string(
        average_azle_wasm_instructions_including_prelude,
        average_motoko_wasm_instructions_including_prelude,
        average_rust_wasm_instructions_including_prelude
    );

    const averages_string = generate_averages_string(
        average_azle_wasm_instructions_body_only,
        average_azle_wasm_instructions_including_prelude_string,
        average_motoko_wasm_instructions_body_only,
        average_motoko_wasm_instructions_including_prelude_string,
        average_rust_wasm_instructions_body_only,
        average_rust_wasm_instructions_including_prelude_string,
        average_azle_motoko_change_multiplier_body_only,
        average_azle_motoko_change_multiplier_including_prelude,
        average_azle_rust_change_multiplier_body_only,
        average_azle_rust_change_multiplier_including_prelude,
        average_motoko_azle_change_multiplier_body_only,
        average_motoko_azle_change_multiplier_including_prelude,
        average_motoko_rust_change_multiplier_body_only,
        average_motoko_rust_change_multiplier_including_prelude,
        average_rust_azle_change_multiplier_body_only,
        average_rust_azle_change_multiplier_including_prelude,
        average_rust_motoko_change_multiplier_body_only,
        average_rust_motoko_change_multiplier_including_prelude
    );

    const benchmarks_string = generate_benchmarks_string(benchmark_results);

    return `${title}\n${description}\n${usd_cost_estimates_string}\n\n${averages_string}\n\n${benchmarks_string}\n`;
}

function generate_usd_cost_estimates_string(
    azle_wasm_instructions_per_update_message: number,
    motoko_wasm_instructions_per_update_message: number,
    rust_wasm_instructions_per_update_message: number
): string {
    const usd_cost_estimates = get_usd_cost_estimates(
        azle_wasm_instructions_per_update_message,
        motoko_wasm_instructions_per_update_message,
        rust_wasm_instructions_per_update_message
    );

    const title = '## USD Cost Estimates Per Year';
    const description = `These estimates use the average Wasm instructions per function call including the function prelude.\n\nThe Wasm instruction counts used are:\n\n- Azle: ${format_number_to_rust(
        azle_wasm_instructions_per_update_message.toFixed(0)
    )}\n- Motoko: ${format_number_to_rust(
        motoko_wasm_instructions_per_update_message.toFixed(0)
    )}\n- Rust: ${format_number_to_rust(
        rust_wasm_instructions_per_update_message.toFixed(0)
    )}`;

    const cycle_costs_table_string = `
### Cycle Costs Table

Cycle costs taken from [here](https://internetcomputer.org/docs/current/developer-docs/deploy/computation-and-storage-costs/).

| Compute Percent Allocated Per Second | Update Message Execution | Ten Update Instructions Execution | Xnet Call | Xnet Byte Transmission | Ingress Message Reception | Ingress Byte Reception | GB Storage Per Second |
| ------------------------------------ | ------------------------ | --------------------------------- | --------- | ---------------------- | ------------------------- | ---------------------- | --------------------- |
| 100_000                              | 590_000                  | 4                                 | 260_000   | 1_000                  | 1_200_000                 | 2_000                  | 127_000               |
    `;

    const application_scenarios_string =
        generate_application_scenarios_string();
    const application_costs_string =
        generate_application_costs_string(usd_cost_estimates);

    return `${title}\n\n${description}\n\n${cycle_costs_table_string}\n\n${application_scenarios_string}\n\n${application_costs_string}`;
}

function generate_application_scenarios_string(): string {
    const application_scenarios_title = `### Application Scenarios`;

    const application_scenarios_header_names = [
        'Usage',
        'Query/Update Heaviness',
        'Ingress Bytes Per Query Message',
        'Ingress Bytes Per Update Message',
        'GB Storage',
        'Query Messages Per Second',
        'Update Messages Per Second',
        'Xnet Calls Per Second',
        'Xnet Call Bytes'
    ];
    const application_scenarios_header = `| ${application_scenarios_header_names.join(
        ' | '
    )} |`;
    const application_scenarios_header_separator = `| ${application_scenarios_header_names
        .map((_) => '---')
        .join(' | ')} |`;

    const application_scenarios_rows = [
        [
            'Light',
            'Even',
            format_number_to_rust(
                USAGE_CONFIG_LIGHT_QUERY_UPDATE_EVEN.ingress_bytes_per_query_message
            ),
            format_number_to_rust(
                USAGE_CONFIG_LIGHT_QUERY_UPDATE_EVEN.ingress_bytes_per_update_message
            ),
            format_number_to_rust(
                USAGE_CONFIG_LIGHT_QUERY_UPDATE_EVEN.gb_storage
            ),
            format_number_to_rust(
                USAGE_CONFIG_LIGHT_QUERY_UPDATE_EVEN.query_messages_per_second
            ),
            format_number_to_rust(
                USAGE_CONFIG_LIGHT_QUERY_UPDATE_EVEN.update_messages_per_second
            ),
            format_number_to_rust(
                USAGE_CONFIG_LIGHT_QUERY_UPDATE_EVEN.xnet_calls_per_second
            ),
            format_number_to_rust(
                USAGE_CONFIG_LIGHT_QUERY_UPDATE_EVEN.xnet_call_bytes
            )
        ].join(' | '),
        [
            'Light',
            'Query Heavy',
            format_number_to_rust(
                USAGE_CONFIG_LIGHT_QUERY_HEAVY.ingress_bytes_per_query_message
            ),
            format_number_to_rust(
                USAGE_CONFIG_LIGHT_QUERY_HEAVY.ingress_bytes_per_update_message
            ),
            format_number_to_rust(USAGE_CONFIG_LIGHT_QUERY_HEAVY.gb_storage),
            format_number_to_rust(
                USAGE_CONFIG_LIGHT_QUERY_HEAVY.query_messages_per_second
            ),
            format_number_to_rust(
                USAGE_CONFIG_LIGHT_QUERY_HEAVY.update_messages_per_second
            ),
            format_number_to_rust(
                USAGE_CONFIG_LIGHT_QUERY_HEAVY.xnet_calls_per_second
            ),
            format_number_to_rust(
                USAGE_CONFIG_LIGHT_QUERY_HEAVY.xnet_call_bytes
            )
        ].join(' | '),
        [
            'Light',
            'Update Heavy',
            format_number_to_rust(
                USAGE_CONFIG_LIGHT_UPDATE_HEAVY.ingress_bytes_per_query_message
            ),
            format_number_to_rust(
                USAGE_CONFIG_LIGHT_UPDATE_HEAVY.ingress_bytes_per_update_message
            ),
            format_number_to_rust(USAGE_CONFIG_LIGHT_UPDATE_HEAVY.gb_storage),
            format_number_to_rust(
                USAGE_CONFIG_LIGHT_UPDATE_HEAVY.query_messages_per_second
            ),
            format_number_to_rust(
                USAGE_CONFIG_LIGHT_UPDATE_HEAVY.update_messages_per_second
            ),
            format_number_to_rust(
                USAGE_CONFIG_LIGHT_UPDATE_HEAVY.xnet_calls_per_second
            ),
            format_number_to_rust(
                USAGE_CONFIG_LIGHT_UPDATE_HEAVY.xnet_call_bytes
            )
        ].join(' | '),
        [
            'Moderate',
            'Even',
            format_number_to_rust(
                USAGE_CONFIG_MODERATE_QUERY_UPDATE_EVEN.ingress_bytes_per_query_message
            ),
            format_number_to_rust(
                USAGE_CONFIG_MODERATE_QUERY_UPDATE_EVEN.ingress_bytes_per_update_message
            ),
            format_number_to_rust(
                USAGE_CONFIG_MODERATE_QUERY_UPDATE_EVEN.gb_storage
            ),
            format_number_to_rust(
                USAGE_CONFIG_MODERATE_QUERY_UPDATE_EVEN.query_messages_per_second
            ),
            format_number_to_rust(
                USAGE_CONFIG_MODERATE_QUERY_UPDATE_EVEN.update_messages_per_second
            ),
            format_number_to_rust(
                USAGE_CONFIG_MODERATE_QUERY_UPDATE_EVEN.xnet_calls_per_second
            ),
            format_number_to_rust(
                USAGE_CONFIG_MODERATE_QUERY_UPDATE_EVEN.xnet_call_bytes
            )
        ].join(' | '),
        [
            'Moderate',
            'Query Heavy',
            format_number_to_rust(
                USAGE_CONFIG_MODERATE_QUERY_HEAVY.ingress_bytes_per_query_message
            ),
            format_number_to_rust(
                USAGE_CONFIG_MODERATE_QUERY_HEAVY.ingress_bytes_per_update_message
            ),
            format_number_to_rust(USAGE_CONFIG_MODERATE_QUERY_HEAVY.gb_storage),
            format_number_to_rust(
                USAGE_CONFIG_MODERATE_QUERY_HEAVY.query_messages_per_second
            ),
            format_number_to_rust(
                USAGE_CONFIG_MODERATE_QUERY_HEAVY.update_messages_per_second
            ),
            format_number_to_rust(
                USAGE_CONFIG_MODERATE_QUERY_HEAVY.xnet_calls_per_second
            ),
            format_number_to_rust(
                USAGE_CONFIG_MODERATE_QUERY_HEAVY.xnet_call_bytes
            )
        ].join(' | '),
        [
            'Moderate',
            'Update Heavy',
            format_number_to_rust(
                USAGE_CONFIG_MODERATE_UPDATE_HEAVY.ingress_bytes_per_query_message
            ),
            format_number_to_rust(
                USAGE_CONFIG_MODERATE_UPDATE_HEAVY.ingress_bytes_per_update_message
            ),
            format_number_to_rust(
                USAGE_CONFIG_MODERATE_UPDATE_HEAVY.gb_storage
            ),
            format_number_to_rust(
                USAGE_CONFIG_MODERATE_UPDATE_HEAVY.query_messages_per_second
            ),
            format_number_to_rust(
                USAGE_CONFIG_MODERATE_UPDATE_HEAVY.update_messages_per_second
            ),
            format_number_to_rust(
                USAGE_CONFIG_MODERATE_UPDATE_HEAVY.xnet_calls_per_second
            ),
            format_number_to_rust(
                USAGE_CONFIG_MODERATE_UPDATE_HEAVY.xnet_call_bytes
            )
        ].join(' | '),
        [
            'Heavy',
            'Even',
            format_number_to_rust(
                USAGE_CONFIG_HEAVY_QUERY_UPDATE_EVEN.ingress_bytes_per_query_message
            ),
            format_number_to_rust(
                USAGE_CONFIG_HEAVY_QUERY_UPDATE_EVEN.ingress_bytes_per_update_message
            ),
            format_number_to_rust(
                USAGE_CONFIG_HEAVY_QUERY_UPDATE_EVEN.gb_storage
            ),
            format_number_to_rust(
                USAGE_CONFIG_HEAVY_QUERY_UPDATE_EVEN.query_messages_per_second
            ),
            format_number_to_rust(
                USAGE_CONFIG_HEAVY_QUERY_UPDATE_EVEN.update_messages_per_second
            ),
            format_number_to_rust(
                USAGE_CONFIG_HEAVY_QUERY_UPDATE_EVEN.xnet_calls_per_second
            ),
            format_number_to_rust(
                USAGE_CONFIG_HEAVY_QUERY_UPDATE_EVEN.xnet_call_bytes
            )
        ].join(' | '),
        [
            'Heavy',
            'Query Heavy',
            format_number_to_rust(
                USAGE_CONFIG_HEAVY_QUERY_HEAVY.ingress_bytes_per_query_message
            ),
            format_number_to_rust(
                USAGE_CONFIG_HEAVY_QUERY_HEAVY.ingress_bytes_per_update_message
            ),
            format_number_to_rust(USAGE_CONFIG_HEAVY_QUERY_HEAVY.gb_storage),
            format_number_to_rust(
                USAGE_CONFIG_HEAVY_QUERY_HEAVY.query_messages_per_second
            ),
            format_number_to_rust(
                USAGE_CONFIG_HEAVY_QUERY_HEAVY.update_messages_per_second
            ),
            format_number_to_rust(
                USAGE_CONFIG_HEAVY_QUERY_HEAVY.xnet_calls_per_second
            ),
            format_number_to_rust(
                USAGE_CONFIG_HEAVY_QUERY_HEAVY.xnet_call_bytes
            )
        ].join(' | '),
        [
            'Heavy',
            'Update Heavy',
            format_number_to_rust(
                USAGE_CONFIG_HEAVY_UPDATE_HEAVY.ingress_bytes_per_query_message
            ),
            format_number_to_rust(
                USAGE_CONFIG_HEAVY_UPDATE_HEAVY.ingress_bytes_per_update_message
            ),
            format_number_to_rust(USAGE_CONFIG_HEAVY_UPDATE_HEAVY.gb_storage),
            format_number_to_rust(
                USAGE_CONFIG_HEAVY_UPDATE_HEAVY.query_messages_per_second
            ),
            format_number_to_rust(
                USAGE_CONFIG_HEAVY_UPDATE_HEAVY.update_messages_per_second
            ),
            format_number_to_rust(
                USAGE_CONFIG_HEAVY_UPDATE_HEAVY.xnet_calls_per_second
            ),
            format_number_to_rust(
                USAGE_CONFIG_HEAVY_UPDATE_HEAVY.xnet_call_bytes
            )
        ].join(' | ')
    ].join('\n');

    return `${application_scenarios_title}\n\n${application_scenarios_header}\n${application_scenarios_header_separator}\n${application_scenarios_rows}`;
}

function generate_application_costs_string(
    usd_cost_estimates: USDCostEstimates
): string {
    const application_costs_title = `### Application USD Cost Estimates Per Year`;

    const application_costs_header_names = [
        'Usage',
        'Query/Update Heaviness',
        'CDK',
        'Ingress Messages',
        'Ingress Bytes Query Messages',
        'Ingress Bytes Update Messages',
        'Update Messages',
        'Update Instructions',
        'Xnet Calls',
        'Xnet Byte Transmission',
        'GB Storage',
        'Total Cost'
    ];
    const application_costs_header = `| ${application_costs_header_names.join(
        ' | '
    )} |`;
    const application_costs_header_separator = `| ${application_costs_header_names
        .map((_) => '---')
        .join(' | ')} |`;

    const application_costs_rows = [
        [
            'Light',
            'Even',
            'Azle',
            format_number_to_usd(
                usd_cost_estimates.azle.light.query_update_even.ingress_messages
            ),
            format_number_to_usd(
                usd_cost_estimates.azle.light.query_update_even
                    .ingress_bytes_query_messages
            ),
            format_number_to_usd(
                usd_cost_estimates.azle.light.query_update_even
                    .ingress_bytes_update_messages
            ),
            format_number_to_usd(
                usd_cost_estimates.azle.light.query_update_even.update_messages
            ),
            format_number_to_usd(
                usd_cost_estimates.azle.light.query_update_even
                    .update_instructions
            ),
            format_number_to_usd(
                usd_cost_estimates.azle.light.query_update_even.xnet_calls
            ),
            format_number_to_usd(
                usd_cost_estimates.azle.light.query_update_even.xnet_call_bytes
            ),
            format_number_to_usd(
                usd_cost_estimates.azle.light.query_update_even.gb_storage
            ),
            format_number_to_usd(
                usd_cost_estimates.azle.light.query_update_even.total_cost
            )
        ].join(' | '),
        [
            'Light',
            'Even',
            'Motoko',
            format_number_to_usd(
                usd_cost_estimates.motoko.light.query_update_even
                    .ingress_messages
            ),
            format_number_to_usd(
                usd_cost_estimates.motoko.light.query_update_even
                    .ingress_bytes_query_messages
            ),
            format_number_to_usd(
                usd_cost_estimates.motoko.light.query_update_even
                    .ingress_bytes_update_messages
            ),
            format_number_to_usd(
                usd_cost_estimates.motoko.light.query_update_even
                    .update_messages
            ),
            format_number_to_usd(
                usd_cost_estimates.motoko.light.query_update_even
                    .update_instructions
            ),
            format_number_to_usd(
                usd_cost_estimates.motoko.light.query_update_even.xnet_calls
            ),
            format_number_to_usd(
                usd_cost_estimates.motoko.light.query_update_even
                    .xnet_call_bytes
            ),
            format_number_to_usd(
                usd_cost_estimates.motoko.light.query_update_even.gb_storage
            ),
            format_number_to_usd(
                usd_cost_estimates.motoko.light.query_update_even.total_cost
            )
        ].join(' | '),
        [
            'Light',
            'Even',
            'Rust',
            format_number_to_usd(
                usd_cost_estimates.rust.light.query_update_even.ingress_messages
            ),
            format_number_to_usd(
                usd_cost_estimates.rust.light.query_update_even
                    .ingress_bytes_query_messages
            ),
            format_number_to_usd(
                usd_cost_estimates.rust.light.query_update_even
                    .ingress_bytes_update_messages
            ),
            format_number_to_usd(
                usd_cost_estimates.rust.light.query_update_even.update_messages
            ),
            format_number_to_usd(
                usd_cost_estimates.rust.light.query_update_even
                    .update_instructions
            ),
            format_number_to_usd(
                usd_cost_estimates.rust.light.query_update_even.xnet_calls
            ),
            format_number_to_usd(
                usd_cost_estimates.rust.light.query_update_even.xnet_call_bytes
            ),
            format_number_to_usd(
                usd_cost_estimates.rust.light.query_update_even.gb_storage
            ),
            format_number_to_usd(
                usd_cost_estimates.rust.light.query_update_even.total_cost
            )
        ].join(' | '),
        [
            'Light',
            'Query Heavy',
            'Azle',
            format_number_to_usd(
                usd_cost_estimates.azle.light.query_heavy.ingress_messages
            ),
            format_number_to_usd(
                usd_cost_estimates.azle.light.query_heavy
                    .ingress_bytes_query_messages
            ),
            format_number_to_usd(
                usd_cost_estimates.azle.light.query_heavy
                    .ingress_bytes_update_messages
            ),
            format_number_to_usd(
                usd_cost_estimates.azle.light.query_heavy.update_messages
            ),
            format_number_to_usd(
                usd_cost_estimates.azle.light.query_heavy.update_instructions
            ),
            format_number_to_usd(
                usd_cost_estimates.azle.light.query_heavy.xnet_calls
            ),
            format_number_to_usd(
                usd_cost_estimates.azle.light.query_heavy.xnet_call_bytes
            ),
            format_number_to_usd(
                usd_cost_estimates.azle.light.query_heavy.gb_storage
            ),
            format_number_to_usd(
                usd_cost_estimates.azle.light.query_heavy.total_cost
            )
        ].join(' | '),
        [
            'Light',
            'Query Heavy',
            'Motoko',
            format_number_to_usd(
                usd_cost_estimates.motoko.light.query_heavy.ingress_messages
            ),
            format_number_to_usd(
                usd_cost_estimates.motoko.light.query_heavy
                    .ingress_bytes_query_messages
            ),
            format_number_to_usd(
                usd_cost_estimates.motoko.light.query_heavy
                    .ingress_bytes_update_messages
            ),
            format_number_to_usd(
                usd_cost_estimates.motoko.light.query_heavy.update_messages
            ),
            format_number_to_usd(
                usd_cost_estimates.motoko.light.query_heavy.update_instructions
            ),
            format_number_to_usd(
                usd_cost_estimates.motoko.light.query_heavy.xnet_calls
            ),
            format_number_to_usd(
                usd_cost_estimates.motoko.light.query_heavy.xnet_call_bytes
            ),
            format_number_to_usd(
                usd_cost_estimates.motoko.light.query_heavy.gb_storage
            ),
            format_number_to_usd(
                usd_cost_estimates.motoko.light.query_heavy.total_cost
            )
        ].join(' | '),
        [
            'Light',
            'Query Heavy',
            'Rust',
            format_number_to_usd(
                usd_cost_estimates.rust.light.query_heavy.ingress_messages
            ),
            format_number_to_usd(
                usd_cost_estimates.rust.light.query_heavy
                    .ingress_bytes_query_messages
            ),
            format_number_to_usd(
                usd_cost_estimates.rust.light.query_heavy
                    .ingress_bytes_update_messages
            ),
            format_number_to_usd(
                usd_cost_estimates.rust.light.query_heavy.update_messages
            ),
            format_number_to_usd(
                usd_cost_estimates.rust.light.query_heavy.update_instructions
            ),
            format_number_to_usd(
                usd_cost_estimates.rust.light.query_heavy.xnet_calls
            ),
            format_number_to_usd(
                usd_cost_estimates.rust.light.query_heavy.xnet_call_bytes
            ),
            format_number_to_usd(
                usd_cost_estimates.rust.light.query_heavy.gb_storage
            ),
            format_number_to_usd(
                usd_cost_estimates.rust.light.query_heavy.total_cost
            )
        ].join(' | '),
        [
            'Light',
            'Update Heavy',
            'Azle',
            format_number_to_usd(
                usd_cost_estimates.azle.light.update_heavy.ingress_messages
            ),
            format_number_to_usd(
                usd_cost_estimates.azle.light.update_heavy
                    .ingress_bytes_query_messages
            ),
            format_number_to_usd(
                usd_cost_estimates.azle.light.update_heavy
                    .ingress_bytes_update_messages
            ),
            format_number_to_usd(
                usd_cost_estimates.azle.light.update_heavy.update_messages
            ),
            format_number_to_usd(
                usd_cost_estimates.azle.light.update_heavy.update_instructions
            ),
            format_number_to_usd(
                usd_cost_estimates.azle.light.update_heavy.xnet_calls
            ),
            format_number_to_usd(
                usd_cost_estimates.azle.light.update_heavy.xnet_call_bytes
            ),
            format_number_to_usd(
                usd_cost_estimates.azle.light.update_heavy.gb_storage
            ),
            format_number_to_usd(
                usd_cost_estimates.azle.light.update_heavy.total_cost
            )
        ].join(' | '),
        [
            'Light',
            'Update Heavy',
            'Motoko',
            format_number_to_usd(
                usd_cost_estimates.motoko.light.update_heavy.ingress_messages
            ),
            format_number_to_usd(
                usd_cost_estimates.motoko.light.update_heavy
                    .ingress_bytes_query_messages
            ),
            format_number_to_usd(
                usd_cost_estimates.motoko.light.update_heavy
                    .ingress_bytes_update_messages
            ),
            format_number_to_usd(
                usd_cost_estimates.motoko.light.update_heavy.update_messages
            ),
            format_number_to_usd(
                usd_cost_estimates.motoko.light.update_heavy.update_instructions
            ),
            format_number_to_usd(
                usd_cost_estimates.motoko.light.update_heavy.xnet_calls
            ),
            format_number_to_usd(
                usd_cost_estimates.motoko.light.update_heavy.xnet_call_bytes
            ),
            format_number_to_usd(
                usd_cost_estimates.motoko.light.update_heavy.gb_storage
            ),
            format_number_to_usd(
                usd_cost_estimates.motoko.light.update_heavy.total_cost
            )
        ].join(' | '),
        [
            'Light',
            'Update Heavy',
            'Rust',
            format_number_to_usd(
                usd_cost_estimates.rust.light.update_heavy.ingress_messages
            ),
            format_number_to_usd(
                usd_cost_estimates.rust.light.update_heavy
                    .ingress_bytes_query_messages
            ),
            format_number_to_usd(
                usd_cost_estimates.rust.light.update_heavy
                    .ingress_bytes_update_messages
            ),
            format_number_to_usd(
                usd_cost_estimates.rust.light.update_heavy.update_messages
            ),
            format_number_to_usd(
                usd_cost_estimates.rust.light.update_heavy.update_instructions
            ),
            format_number_to_usd(
                usd_cost_estimates.rust.light.update_heavy.xnet_calls
            ),
            format_number_to_usd(
                usd_cost_estimates.rust.light.update_heavy.xnet_call_bytes
            ),
            format_number_to_usd(
                usd_cost_estimates.rust.light.update_heavy.gb_storage
            ),
            format_number_to_usd(
                usd_cost_estimates.rust.light.update_heavy.total_cost
            )
        ].join(' | '),
        [
            'Moderate',
            'Even',
            'Azle',
            format_number_to_usd(
                usd_cost_estimates.azle.moderate.query_update_even
                    .ingress_messages
            ),
            format_number_to_usd(
                usd_cost_estimates.azle.moderate.query_update_even
                    .ingress_bytes_query_messages
            ),
            format_number_to_usd(
                usd_cost_estimates.azle.moderate.query_update_even
                    .ingress_bytes_update_messages
            ),
            format_number_to_usd(
                usd_cost_estimates.azle.moderate.query_update_even
                    .update_messages
            ),
            format_number_to_usd(
                usd_cost_estimates.azle.moderate.query_update_even
                    .update_instructions
            ),
            format_number_to_usd(
                usd_cost_estimates.azle.moderate.query_update_even.xnet_calls
            ),
            format_number_to_usd(
                usd_cost_estimates.azle.moderate.query_update_even
                    .xnet_call_bytes
            ),
            format_number_to_usd(
                usd_cost_estimates.azle.moderate.query_update_even.gb_storage
            ),
            format_number_to_usd(
                usd_cost_estimates.azle.moderate.query_update_even.total_cost
            )
        ].join(' | '),
        [
            'Moderate',
            'Even',
            'Motoko',
            format_number_to_usd(
                usd_cost_estimates.motoko.moderate.query_update_even
                    .ingress_messages
            ),
            format_number_to_usd(
                usd_cost_estimates.motoko.moderate.query_update_even
                    .ingress_bytes_query_messages
            ),
            format_number_to_usd(
                usd_cost_estimates.motoko.moderate.query_update_even
                    .ingress_bytes_update_messages
            ),
            format_number_to_usd(
                usd_cost_estimates.motoko.moderate.query_update_even
                    .update_messages
            ),
            format_number_to_usd(
                usd_cost_estimates.motoko.moderate.query_update_even
                    .update_instructions
            ),
            format_number_to_usd(
                usd_cost_estimates.motoko.moderate.query_update_even.xnet_calls
            ),
            format_number_to_usd(
                usd_cost_estimates.motoko.moderate.query_update_even
                    .xnet_call_bytes
            ),
            format_number_to_usd(
                usd_cost_estimates.motoko.moderate.query_update_even.gb_storage
            ),
            format_number_to_usd(
                usd_cost_estimates.motoko.moderate.query_update_even.total_cost
            )
        ].join(' | '),
        [
            'Moderate',
            'Even',
            'Rust',
            format_number_to_usd(
                usd_cost_estimates.rust.moderate.query_update_even
                    .ingress_messages
            ),
            format_number_to_usd(
                usd_cost_estimates.rust.moderate.query_update_even
                    .ingress_bytes_query_messages
            ),
            format_number_to_usd(
                usd_cost_estimates.rust.moderate.query_update_even
                    .ingress_bytes_update_messages
            ),
            format_number_to_usd(
                usd_cost_estimates.rust.moderate.query_update_even
                    .update_messages
            ),
            format_number_to_usd(
                usd_cost_estimates.rust.moderate.query_update_even
                    .update_instructions
            ),
            format_number_to_usd(
                usd_cost_estimates.rust.moderate.query_update_even.xnet_calls
            ),
            format_number_to_usd(
                usd_cost_estimates.rust.moderate.query_update_even
                    .xnet_call_bytes
            ),
            format_number_to_usd(
                usd_cost_estimates.rust.moderate.query_update_even.gb_storage
            ),
            format_number_to_usd(
                usd_cost_estimates.rust.moderate.query_update_even.total_cost
            )
        ].join(' | '),
        [
            'Moderate',
            'Query Heavy',
            'Azle',
            format_number_to_usd(
                usd_cost_estimates.azle.moderate.query_heavy.ingress_messages
            ),
            format_number_to_usd(
                usd_cost_estimates.azle.moderate.query_heavy
                    .ingress_bytes_query_messages
            ),
            format_number_to_usd(
                usd_cost_estimates.azle.moderate.query_heavy
                    .ingress_bytes_update_messages
            ),
            format_number_to_usd(
                usd_cost_estimates.azle.moderate.query_heavy.update_messages
            ),
            format_number_to_usd(
                usd_cost_estimates.azle.moderate.query_heavy.update_instructions
            ),
            format_number_to_usd(
                usd_cost_estimates.azle.moderate.query_heavy.xnet_calls
            ),
            format_number_to_usd(
                usd_cost_estimates.azle.moderate.query_heavy.xnet_call_bytes
            ),
            format_number_to_usd(
                usd_cost_estimates.azle.moderate.query_heavy.gb_storage
            ),
            format_number_to_usd(
                usd_cost_estimates.azle.moderate.query_heavy.total_cost
            )
        ].join(' | '),
        [
            'Moderate',
            'Query Heavy',
            'Motoko',
            format_number_to_usd(
                usd_cost_estimates.motoko.moderate.query_heavy.ingress_messages
            ),
            format_number_to_usd(
                usd_cost_estimates.motoko.moderate.query_heavy
                    .ingress_bytes_query_messages
            ),
            format_number_to_usd(
                usd_cost_estimates.motoko.moderate.query_heavy
                    .ingress_bytes_update_messages
            ),
            format_number_to_usd(
                usd_cost_estimates.motoko.moderate.query_heavy.update_messages
            ),
            format_number_to_usd(
                usd_cost_estimates.motoko.moderate.query_heavy
                    .update_instructions
            ),
            format_number_to_usd(
                usd_cost_estimates.motoko.moderate.query_heavy.xnet_calls
            ),
            format_number_to_usd(
                usd_cost_estimates.motoko.moderate.query_heavy.xnet_call_bytes
            ),
            format_number_to_usd(
                usd_cost_estimates.motoko.moderate.query_heavy.gb_storage
            ),
            format_number_to_usd(
                usd_cost_estimates.motoko.moderate.query_heavy.total_cost
            )
        ].join(' | '),
        [
            'Moderate',
            'Query Heavy',
            'Rust',
            format_number_to_usd(
                usd_cost_estimates.rust.moderate.query_heavy.ingress_messages
            ),
            format_number_to_usd(
                usd_cost_estimates.rust.moderate.query_heavy
                    .ingress_bytes_query_messages
            ),
            format_number_to_usd(
                usd_cost_estimates.rust.moderate.query_heavy
                    .ingress_bytes_update_messages
            ),
            format_number_to_usd(
                usd_cost_estimates.rust.moderate.query_heavy.update_messages
            ),
            format_number_to_usd(
                usd_cost_estimates.rust.moderate.query_heavy.update_instructions
            ),
            format_number_to_usd(
                usd_cost_estimates.rust.moderate.query_heavy.xnet_calls
            ),
            format_number_to_usd(
                usd_cost_estimates.rust.moderate.query_heavy.xnet_call_bytes
            ),
            format_number_to_usd(
                usd_cost_estimates.rust.moderate.query_heavy.gb_storage
            ),
            format_number_to_usd(
                usd_cost_estimates.rust.moderate.query_heavy.total_cost
            )
        ].join(' | '),
        [
            'Moderate',
            'Update Heavy',
            'Azle',
            format_number_to_usd(
                usd_cost_estimates.azle.moderate.update_heavy.ingress_messages
            ),
            format_number_to_usd(
                usd_cost_estimates.azle.moderate.update_heavy
                    .ingress_bytes_query_messages
            ),
            format_number_to_usd(
                usd_cost_estimates.azle.moderate.update_heavy
                    .ingress_bytes_update_messages
            ),
            format_number_to_usd(
                usd_cost_estimates.azle.moderate.update_heavy.update_messages
            ),
            format_number_to_usd(
                usd_cost_estimates.azle.moderate.update_heavy
                    .update_instructions
            ),
            format_number_to_usd(
                usd_cost_estimates.azle.moderate.update_heavy.xnet_calls
            ),
            format_number_to_usd(
                usd_cost_estimates.azle.moderate.update_heavy.xnet_call_bytes
            ),
            format_number_to_usd(
                usd_cost_estimates.azle.moderate.update_heavy.gb_storage
            ),
            format_number_to_usd(
                usd_cost_estimates.azle.moderate.update_heavy.total_cost
            )
        ].join(' | '),
        [
            'Moderate',
            'Update Heavy',
            'Motoko',
            format_number_to_usd(
                usd_cost_estimates.motoko.moderate.update_heavy.ingress_messages
            ),
            format_number_to_usd(
                usd_cost_estimates.motoko.moderate.update_heavy
                    .ingress_bytes_query_messages
            ),
            format_number_to_usd(
                usd_cost_estimates.motoko.moderate.update_heavy
                    .ingress_bytes_update_messages
            ),
            format_number_to_usd(
                usd_cost_estimates.motoko.moderate.update_heavy.update_messages
            ),
            format_number_to_usd(
                usd_cost_estimates.motoko.moderate.update_heavy
                    .update_instructions
            ),
            format_number_to_usd(
                usd_cost_estimates.motoko.moderate.update_heavy.xnet_calls
            ),
            format_number_to_usd(
                usd_cost_estimates.motoko.moderate.update_heavy.xnet_call_bytes
            ),
            format_number_to_usd(
                usd_cost_estimates.motoko.moderate.update_heavy.gb_storage
            ),
            format_number_to_usd(
                usd_cost_estimates.motoko.moderate.update_heavy.total_cost
            )
        ].join(' | '),
        [
            'Moderate',
            'Update Heavy',
            'Rust',
            format_number_to_usd(
                usd_cost_estimates.rust.moderate.update_heavy.ingress_messages
            ),
            format_number_to_usd(
                usd_cost_estimates.rust.moderate.update_heavy
                    .ingress_bytes_query_messages
            ),
            format_number_to_usd(
                usd_cost_estimates.rust.moderate.update_heavy
                    .ingress_bytes_update_messages
            ),
            format_number_to_usd(
                usd_cost_estimates.rust.moderate.update_heavy.update_messages
            ),
            format_number_to_usd(
                usd_cost_estimates.rust.moderate.update_heavy
                    .update_instructions
            ),
            format_number_to_usd(
                usd_cost_estimates.rust.moderate.update_heavy.xnet_calls
            ),
            format_number_to_usd(
                usd_cost_estimates.rust.moderate.update_heavy.xnet_call_bytes
            ),
            format_number_to_usd(
                usd_cost_estimates.rust.moderate.update_heavy.gb_storage
            ),
            format_number_to_usd(
                usd_cost_estimates.rust.moderate.update_heavy.total_cost
            )
        ].join(' | '),
        [
            'Heavy',
            'Even',
            'Azle',
            format_number_to_usd(
                usd_cost_estimates.azle.heavy.query_update_even.ingress_messages
            ),
            format_number_to_usd(
                usd_cost_estimates.azle.heavy.query_update_even
                    .ingress_bytes_query_messages
            ),
            format_number_to_usd(
                usd_cost_estimates.azle.heavy.query_update_even
                    .ingress_bytes_update_messages
            ),
            format_number_to_usd(
                usd_cost_estimates.azle.heavy.query_update_even.update_messages
            ),
            format_number_to_usd(
                usd_cost_estimates.azle.heavy.query_update_even
                    .update_instructions
            ),
            format_number_to_usd(
                usd_cost_estimates.azle.heavy.query_update_even.xnet_calls
            ),
            format_number_to_usd(
                usd_cost_estimates.azle.heavy.query_update_even.xnet_call_bytes
            ),
            format_number_to_usd(
                usd_cost_estimates.azle.heavy.query_update_even.gb_storage
            ),
            format_number_to_usd(
                usd_cost_estimates.azle.heavy.query_update_even.total_cost
            )
        ].join(' | '),
        [
            'Heavy',
            'Even',
            'Motoko',
            format_number_to_usd(
                usd_cost_estimates.motoko.heavy.query_update_even
                    .ingress_messages
            ),
            format_number_to_usd(
                usd_cost_estimates.motoko.heavy.query_update_even
                    .ingress_bytes_query_messages
            ),
            format_number_to_usd(
                usd_cost_estimates.motoko.heavy.query_update_even
                    .ingress_bytes_update_messages
            ),
            format_number_to_usd(
                usd_cost_estimates.motoko.heavy.query_update_even
                    .update_messages
            ),
            format_number_to_usd(
                usd_cost_estimates.motoko.heavy.query_update_even
                    .update_instructions
            ),
            format_number_to_usd(
                usd_cost_estimates.motoko.heavy.query_update_even.xnet_calls
            ),
            format_number_to_usd(
                usd_cost_estimates.motoko.heavy.query_update_even
                    .xnet_call_bytes
            ),
            format_number_to_usd(
                usd_cost_estimates.motoko.heavy.query_update_even.gb_storage
            ),
            format_number_to_usd(
                usd_cost_estimates.motoko.heavy.query_update_even.total_cost
            )
        ].join(' | '),
        [
            'Heavy',
            'Even',
            'Rust',
            format_number_to_usd(
                usd_cost_estimates.rust.heavy.query_update_even.ingress_messages
            ),
            format_number_to_usd(
                usd_cost_estimates.rust.heavy.query_update_even
                    .ingress_bytes_query_messages
            ),
            format_number_to_usd(
                usd_cost_estimates.rust.heavy.query_update_even
                    .ingress_bytes_update_messages
            ),
            format_number_to_usd(
                usd_cost_estimates.rust.heavy.query_update_even.update_messages
            ),
            format_number_to_usd(
                usd_cost_estimates.rust.heavy.query_update_even
                    .update_instructions
            ),
            format_number_to_usd(
                usd_cost_estimates.rust.heavy.query_update_even.xnet_calls
            ),
            format_number_to_usd(
                usd_cost_estimates.rust.heavy.query_update_even.xnet_call_bytes
            ),
            format_number_to_usd(
                usd_cost_estimates.rust.heavy.query_update_even.gb_storage
            ),
            format_number_to_usd(
                usd_cost_estimates.rust.heavy.query_update_even.total_cost
            )
        ].join(' | '),
        [
            'Heavy',
            'Query Heavy',
            'Azle',
            format_number_to_usd(
                usd_cost_estimates.azle.heavy.query_heavy.ingress_messages
            ),
            format_number_to_usd(
                usd_cost_estimates.azle.heavy.query_heavy
                    .ingress_bytes_query_messages
            ),
            format_number_to_usd(
                usd_cost_estimates.azle.heavy.query_heavy
                    .ingress_bytes_update_messages
            ),
            format_number_to_usd(
                usd_cost_estimates.azle.heavy.query_heavy.update_messages
            ),
            format_number_to_usd(
                usd_cost_estimates.azle.heavy.query_heavy.update_instructions
            ),
            format_number_to_usd(
                usd_cost_estimates.azle.heavy.query_heavy.xnet_calls
            ),
            format_number_to_usd(
                usd_cost_estimates.azle.heavy.query_heavy.xnet_call_bytes
            ),
            format_number_to_usd(
                usd_cost_estimates.azle.heavy.query_heavy.gb_storage
            ),
            format_number_to_usd(
                usd_cost_estimates.azle.heavy.query_heavy.total_cost
            )
        ].join(' | '),
        [
            'Heavy',
            'Query Heavy',
            'Motoko',
            format_number_to_usd(
                usd_cost_estimates.motoko.heavy.query_heavy.ingress_messages
            ),
            format_number_to_usd(
                usd_cost_estimates.motoko.heavy.query_heavy
                    .ingress_bytes_query_messages
            ),
            format_number_to_usd(
                usd_cost_estimates.motoko.heavy.query_heavy
                    .ingress_bytes_update_messages
            ),
            format_number_to_usd(
                usd_cost_estimates.motoko.heavy.query_heavy.update_messages
            ),
            format_number_to_usd(
                usd_cost_estimates.motoko.heavy.query_heavy.update_instructions
            ),
            format_number_to_usd(
                usd_cost_estimates.motoko.heavy.query_heavy.xnet_calls
            ),
            format_number_to_usd(
                usd_cost_estimates.motoko.heavy.query_heavy.xnet_call_bytes
            ),
            format_number_to_usd(
                usd_cost_estimates.motoko.heavy.query_heavy.gb_storage
            ),
            format_number_to_usd(
                usd_cost_estimates.motoko.heavy.query_heavy.total_cost
            )
        ].join(' | '),
        [
            'Heavy',
            'Query Heavy',
            'Rust',
            format_number_to_usd(
                usd_cost_estimates.rust.heavy.query_heavy.ingress_messages
            ),
            format_number_to_usd(
                usd_cost_estimates.rust.heavy.query_heavy
                    .ingress_bytes_query_messages
            ),
            format_number_to_usd(
                usd_cost_estimates.rust.heavy.query_heavy
                    .ingress_bytes_update_messages
            ),
            format_number_to_usd(
                usd_cost_estimates.rust.heavy.query_heavy.update_messages
            ),
            format_number_to_usd(
                usd_cost_estimates.rust.heavy.query_heavy.update_instructions
            ),
            format_number_to_usd(
                usd_cost_estimates.rust.heavy.query_heavy.xnet_calls
            ),
            format_number_to_usd(
                usd_cost_estimates.rust.heavy.query_heavy.xnet_call_bytes
            ),
            format_number_to_usd(
                usd_cost_estimates.rust.heavy.query_heavy.gb_storage
            ),
            format_number_to_usd(
                usd_cost_estimates.rust.heavy.query_heavy.total_cost
            )
        ].join(' | '),
        [
            'Heavy',
            'Update Heavy',
            'Azle',
            format_number_to_usd(
                usd_cost_estimates.azle.heavy.update_heavy.ingress_messages
            ),
            format_number_to_usd(
                usd_cost_estimates.azle.heavy.update_heavy
                    .ingress_bytes_query_messages
            ),
            format_number_to_usd(
                usd_cost_estimates.azle.heavy.update_heavy
                    .ingress_bytes_update_messages
            ),
            format_number_to_usd(
                usd_cost_estimates.azle.heavy.update_heavy.update_messages
            ),
            format_number_to_usd(
                usd_cost_estimates.azle.heavy.update_heavy.update_instructions
            ),
            format_number_to_usd(
                usd_cost_estimates.azle.heavy.update_heavy.xnet_calls
            ),
            format_number_to_usd(
                usd_cost_estimates.azle.heavy.update_heavy.xnet_call_bytes
            ),
            format_number_to_usd(
                usd_cost_estimates.azle.heavy.update_heavy.gb_storage
            ),
            format_number_to_usd(
                usd_cost_estimates.azle.heavy.update_heavy.total_cost
            )
        ].join(' | '),
        [
            'Heavy',
            'Update Heavy',
            'Motoko',
            format_number_to_usd(
                usd_cost_estimates.motoko.heavy.update_heavy.ingress_messages
            ),
            format_number_to_usd(
                usd_cost_estimates.motoko.heavy.update_heavy
                    .ingress_bytes_query_messages
            ),
            format_number_to_usd(
                usd_cost_estimates.motoko.heavy.update_heavy
                    .ingress_bytes_update_messages
            ),
            format_number_to_usd(
                usd_cost_estimates.motoko.heavy.update_heavy.update_messages
            ),
            format_number_to_usd(
                usd_cost_estimates.motoko.heavy.update_heavy.update_instructions
            ),
            format_number_to_usd(
                usd_cost_estimates.motoko.heavy.update_heavy.xnet_calls
            ),
            format_number_to_usd(
                usd_cost_estimates.motoko.heavy.update_heavy.xnet_call_bytes
            ),
            format_number_to_usd(
                usd_cost_estimates.motoko.heavy.update_heavy.gb_storage
            ),
            format_number_to_usd(
                usd_cost_estimates.motoko.heavy.update_heavy.total_cost
            )
        ].join(' | '),
        [
            'Heavy',
            'Update Heavy',
            'Rust',
            format_number_to_usd(
                usd_cost_estimates.rust.heavy.update_heavy.ingress_messages
            ),
            format_number_to_usd(
                usd_cost_estimates.rust.heavy.update_heavy
                    .ingress_bytes_query_messages
            ),
            format_number_to_usd(
                usd_cost_estimates.rust.heavy.update_heavy
                    .ingress_bytes_update_messages
            ),
            format_number_to_usd(
                usd_cost_estimates.rust.heavy.update_heavy.update_messages
            ),
            format_number_to_usd(
                usd_cost_estimates.rust.heavy.update_heavy.update_instructions
            ),
            format_number_to_usd(
                usd_cost_estimates.rust.heavy.update_heavy.xnet_calls
            ),
            format_number_to_usd(
                usd_cost_estimates.rust.heavy.update_heavy.xnet_call_bytes
            ),
            format_number_to_usd(
                usd_cost_estimates.rust.heavy.update_heavy.gb_storage
            ),
            format_number_to_usd(
                usd_cost_estimates.rust.heavy.update_heavy.total_cost
            )
        ].join(' | ')
    ].join('\n');

    return `${application_costs_title}\n\n${application_costs_header}\n${application_costs_header_separator}\n${application_costs_rows}`;
}

function generate_averages_string(
    average_azle_wasm_instructions_body_only: string,
    average_azle_wasm_instructions_including_prelude: string,
    average_motoko_wasm_instructions_body_only: string,
    average_motoko_wasm_instructions_including_prelude: string,
    average_rust_wasm_instructions_body_only: string,
    average_rust_wasm_instructions_including_prelude: string,
    average_azle_motoko_change_multiplier_body_only: string,
    average_azle_motoko_change_multiplier_including_prelude: string,
    average_azle_rust_change_multiplier_body_only: string,
    average_azle_rust_change_multiplier_including_prelude: string,
    average_motoko_azle_change_multiplier_body_only: string,
    average_motoko_azle_change_multiplier_including_prelude: string,
    average_motoko_rust_change_multiplier_body_only: string,
    average_motoko_rust_change_multiplier_including_prelude: string,
    average_rust_azle_change_multiplier_body_only: string,
    average_rust_azle_change_multiplier_including_prelude: string,
    average_rust_motoko_change_multiplier_body_only: string,
    average_rust_motoko_change_multiplier_including_prelude: string
): string {
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

    return `${averages_title}\n\n${averages_header}\n${averages_header_separator}\n| ${average_rows.join(
        '|'
    )} |`;
}

function generate_benchmarks_string(
    benchmark_results: BenchmarkResult[]
): string {
    const benchmarks_header_names = [
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

    const benchmarks_header = `| ${benchmarks_header_names.join(' | ')} |`;

    const benchamrks_header_separator = `| ${benchmarks_header_names
        .map((_) => '---')
        .join(' | ')} |`;

    const benchmarks_data_rows = benchmark_results.map((benchmark_result) => {
        const description = `${benchmark_result.canister_method}${
            benchmark_result.benchmark_description !== undefined
                ? `: ${benchmark_result.benchmark_description}`
                : ''
        }`;

        const azle_wasm_instructions = `(${format_number_to_rust(
            benchmark_result.azle_wasm_instructions.wasm_body_only.toFixed(0)
        )} / ${format_number_to_rust(
            benchmark_result.azle_wasm_instructions.wasm_including_prelude.toFixed(
                0
            )
        )})`;
        const motoko_wasm_instructions = `(${format_number_to_rust(
            benchmark_result.motoko_wasm_instructions.wasm_body_only.toFixed(0)
        )} / ${format_number_to_rust(
            benchmark_result.motoko_wasm_instructions.wasm_including_prelude.toFixed(
                0
            )
        )})`;
        const rust_wasm_instructions = `(${format_number_to_rust(
            benchmark_result.rust_wasm_instructions.wasm_body_only.toFixed(0)
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
    });

    return `## Benchmarks\n\n${benchmarks_header}\n${benchamrks_header_separator}\n${benchmarks_data_rows.join(
        '\n'
    )}`;
}

function format_number_to_rust(number: string | number | bigint) {
    const number_is_negative = number.toString()[0] === '-';
    const number_is_decimal_less_than_one =
        (number_is_negative === false && Number(number) < 1) ||
        (number_is_negative === true && Number(number) > -1);

    if (number_is_decimal_less_than_one) {
        return number.toString();
    }

    return (
        (number_is_negative ? '-' : '') +
        number
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

function format_number_to_usd(number: number) {
    return number.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
    });
}
