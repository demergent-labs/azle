// TODO make naming perfect
// TODO allow the developer to customize the numbers?
// TODO make this configurable per day, week, month, year etc? Or is just per year sufficient?

import {
    USAGE_CONFIG_LIGHT_QUERY_UPDATE_EVEN,
    USAGE_CONFIG_LIGHT_QUERY_HEAVY,
    USAGE_CONFIG_LIGHT_UPDATE_HEAVY,
    USAGE_CONFIG_MODERATE_QUERY_UPDATE_EVEN,
    USAGE_CONFIG_MODERATE_QUERY_HEAVY,
    USAGE_CONFIG_MODERATE_UPDATE_HEAVY,
    USAGE_CONFIG_HEAVY_QUERY_UPDATE_EVEN,
    USAGE_CONFIG_HEAVY_QUERY_HEAVY,
    USAGE_CONFIG_HEAVY_UPDATE_HEAVY
} from './usage_config';
import { get_usd_cost_estimate, USDCostEstimates } from './usd_cost_estimate';

export function get_usd_cost_estimates(
    azle_wasm_instructions_per_update_message: number,
    motoko_wasm_instructions_per_update_message: number,
    rust_wasm_instructions_per_update_message: number
): USDCostEstimates {
    return {
        azle: {
            light: {
                query_update_even: get_usd_cost_estimate(
                    USAGE_CONFIG_LIGHT_QUERY_UPDATE_EVEN,
                    azle_wasm_instructions_per_update_message
                ),
                query_heavy: get_usd_cost_estimate(
                    USAGE_CONFIG_LIGHT_QUERY_HEAVY,
                    azle_wasm_instructions_per_update_message
                ),
                update_heavy: get_usd_cost_estimate(
                    USAGE_CONFIG_LIGHT_UPDATE_HEAVY,
                    azle_wasm_instructions_per_update_message
                )
            },
            moderate: {
                query_update_even: get_usd_cost_estimate(
                    USAGE_CONFIG_MODERATE_QUERY_UPDATE_EVEN,
                    azle_wasm_instructions_per_update_message
                ),
                query_heavy: get_usd_cost_estimate(
                    USAGE_CONFIG_MODERATE_QUERY_HEAVY,
                    azle_wasm_instructions_per_update_message
                ),
                update_heavy: get_usd_cost_estimate(
                    USAGE_CONFIG_MODERATE_UPDATE_HEAVY,
                    azle_wasm_instructions_per_update_message
                )
            },
            heavy: {
                query_update_even: get_usd_cost_estimate(
                    USAGE_CONFIG_HEAVY_QUERY_UPDATE_EVEN,
                    azle_wasm_instructions_per_update_message
                ),
                query_heavy: get_usd_cost_estimate(
                    USAGE_CONFIG_HEAVY_QUERY_HEAVY,
                    azle_wasm_instructions_per_update_message
                ),
                update_heavy: get_usd_cost_estimate(
                    USAGE_CONFIG_HEAVY_UPDATE_HEAVY,
                    azle_wasm_instructions_per_update_message
                )
            }
        },
        motoko: {
            light: {
                query_update_even: get_usd_cost_estimate(
                    USAGE_CONFIG_LIGHT_QUERY_UPDATE_EVEN,
                    motoko_wasm_instructions_per_update_message
                ),
                query_heavy: get_usd_cost_estimate(
                    USAGE_CONFIG_LIGHT_QUERY_HEAVY,
                    motoko_wasm_instructions_per_update_message
                ),
                update_heavy: get_usd_cost_estimate(
                    USAGE_CONFIG_LIGHT_UPDATE_HEAVY,
                    motoko_wasm_instructions_per_update_message
                )
            },
            moderate: {
                query_update_even: get_usd_cost_estimate(
                    USAGE_CONFIG_MODERATE_QUERY_UPDATE_EVEN,
                    motoko_wasm_instructions_per_update_message
                ),
                query_heavy: get_usd_cost_estimate(
                    USAGE_CONFIG_MODERATE_QUERY_HEAVY,
                    motoko_wasm_instructions_per_update_message
                ),
                update_heavy: get_usd_cost_estimate(
                    USAGE_CONFIG_MODERATE_UPDATE_HEAVY,
                    motoko_wasm_instructions_per_update_message
                )
            },
            heavy: {
                query_update_even: get_usd_cost_estimate(
                    USAGE_CONFIG_HEAVY_QUERY_UPDATE_EVEN,
                    motoko_wasm_instructions_per_update_message
                ),
                query_heavy: get_usd_cost_estimate(
                    USAGE_CONFIG_HEAVY_QUERY_HEAVY,
                    motoko_wasm_instructions_per_update_message
                ),
                update_heavy: get_usd_cost_estimate(
                    USAGE_CONFIG_HEAVY_UPDATE_HEAVY,
                    motoko_wasm_instructions_per_update_message
                )
            }
        },
        rust: {
            light: {
                query_update_even: get_usd_cost_estimate(
                    USAGE_CONFIG_LIGHT_QUERY_UPDATE_EVEN,
                    rust_wasm_instructions_per_update_message
                ),
                query_heavy: get_usd_cost_estimate(
                    USAGE_CONFIG_LIGHT_QUERY_HEAVY,
                    rust_wasm_instructions_per_update_message
                ),
                update_heavy: get_usd_cost_estimate(
                    USAGE_CONFIG_LIGHT_UPDATE_HEAVY,
                    rust_wasm_instructions_per_update_message
                )
            },
            moderate: {
                query_update_even: get_usd_cost_estimate(
                    USAGE_CONFIG_MODERATE_QUERY_UPDATE_EVEN,
                    rust_wasm_instructions_per_update_message
                ),
                query_heavy: get_usd_cost_estimate(
                    USAGE_CONFIG_MODERATE_QUERY_HEAVY,
                    rust_wasm_instructions_per_update_message
                ),
                update_heavy: get_usd_cost_estimate(
                    USAGE_CONFIG_MODERATE_UPDATE_HEAVY,
                    rust_wasm_instructions_per_update_message
                )
            },
            heavy: {
                query_update_even: get_usd_cost_estimate(
                    USAGE_CONFIG_HEAVY_QUERY_UPDATE_EVEN,
                    rust_wasm_instructions_per_update_message
                ),
                query_heavy: get_usd_cost_estimate(
                    USAGE_CONFIG_HEAVY_QUERY_HEAVY,
                    rust_wasm_instructions_per_update_message
                ),
                update_heavy: get_usd_cost_estimate(
                    USAGE_CONFIG_HEAVY_UPDATE_HEAVY,
                    rust_wasm_instructions_per_update_message
                )
            }
        }
    };
}
