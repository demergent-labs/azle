import { BenchmarkResult } from './index';

export function create_csv_report(
    benchmark_results: BenchmarkResult[]
): string {
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

    return `${header_names}\n${data_rows}\n`;
}
