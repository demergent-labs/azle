import { CYCLE_COST_TABLE, USD_PER_CYCLE } from './cycle_costs';
import { UsageConfig } from './usage_config';

const SECONDS_PER_YEAR = 365 * 24 * 60 * 60;

type USD = number;
type Cycles = number;

type USDCostEstimateUsageGroup = {
    light: USDCostEstimateHeavinessGroup;
    moderate: USDCostEstimateHeavinessGroup;
    heavy: USDCostEstimateHeavinessGroup;
};

type USDCostEstimateHeavinessGroup = {
    query_update_even: USDCostEstimate;
    query_heavy: USDCostEstimate;
    update_heavy: USDCostEstimate;
};

export type USDCostEstimates = {
    azle: USDCostEstimateUsageGroup;
    motoko: USDCostEstimateUsageGroup;
    rust: USDCostEstimateUsageGroup;
};

export type USDCostEstimate = {
    ingress_bytes_query_messages: USD;
    ingress_bytes_update_messages: USD;
    update_messages: USD;
    gb_storage: USD;
    compute_percent_allocated_per_second: USD;
    update_instructions: USD;
    total_cost: USD;
    // TODO figure out where to put these
    // azle_motoko_change_multiplier: number;
    // azle_rust_change_multiplier: number;
    // motoko_azle_change_multiplier: number;
    // motoko_rust_change_multiplier: number;
    // rust_azle_change_multiplier: number;
    // rust_motoko_change_multiplier: number;
};

// TODO I don't think I'm calculating the fixed cost per ingress message
export function get_usd_cost_estimate(
    usage_config: UsageConfig,
    wasm_instructions_per_update_message: number
): USDCostEstimate {
    const ingress_bytes_query_messages_cost_usd: USD =
        calculate_cost_usd_ingress_bytes_query_messages(usage_config);
    const ingress_bytes_update_messages_cost_usd: USD =
        calculate_cost_usd_ingress_bytes_update_messages(usage_config);
    const update_messages_cost_usd: USD =
        calculate_cost_usd_update_messages(usage_config);
    const gb_storage_cost_usd: USD =
        calculate_cost_usd_gb_storage(usage_config);
    const compute_percent_allocated_per_second_cost_usd: USD =
        calculate_cost_usd_compute_percent_allocated_per_second();
    const update_instructions_cost_usd: USD =
        calculate_cost_usd_update_instructions(
            usage_config,
            wasm_instructions_per_update_message
        );
    const total_cost_usd: USD =
        ingress_bytes_query_messages_cost_usd +
        ingress_bytes_update_messages_cost_usd +
        update_messages_cost_usd +
        gb_storage_cost_usd +
        compute_percent_allocated_per_second_cost_usd +
        update_instructions_cost_usd;

    return {
        ingress_bytes_query_messages: ingress_bytes_query_messages_cost_usd,
        ingress_bytes_update_messages: ingress_bytes_update_messages_cost_usd,
        update_messages: update_messages_cost_usd,
        gb_storage: gb_storage_cost_usd,
        compute_percent_allocated_per_second:
            compute_percent_allocated_per_second_cost_usd,
        update_instructions: update_instructions_cost_usd,
        total_cost: total_cost_usd
    };
}

function calculate_cost_usd_ingress_bytes_query_messages(
    usage_config: UsageConfig
): USD {
    const cycles_per_query_message: Cycles =
        CYCLE_COST_TABLE.INGRESS_BYTE_RECEPTION *
        usage_config.ingress_bytes_per_query_message;
    const query_messages_per_year =
        SECONDS_PER_YEAR * usage_config.query_messages_per_second;
    const cycles_per_year: Cycles =
        cycles_per_query_message * query_messages_per_year;
    const cost_usd: USD = cycles_per_year * USD_PER_CYCLE;

    return cost_usd;
}

function calculate_cost_usd_ingress_bytes_update_messages(
    usage_config: UsageConfig
): USD {
    const cycles_per_update_message: Cycles =
        CYCLE_COST_TABLE.INGRESS_BYTE_RECEPTION *
        usage_config.ingress_bytes_per_update_message;
    const update_messages_per_year =
        SECONDS_PER_YEAR * usage_config.update_messages_per_second;
    const cycles_per_year: Cycles =
        cycles_per_update_message * update_messages_per_year;
    const cost_usd: USD = cycles_per_year * USD_PER_CYCLE;

    return cost_usd;
}

function calculate_cost_usd_update_messages(usage_config: UsageConfig): USD {
    const cycles_per_update_message: Cycles =
        CYCLE_COST_TABLE.UPDATE_MESSAGE_EXECUTION;
    const update_messages_per_year =
        SECONDS_PER_YEAR * usage_config.update_messages_per_second;
    const cycles_per_year: Cycles =
        cycles_per_update_message * update_messages_per_year;
    const cost_usd: USD = cycles_per_year * USD_PER_CYCLE;

    return cost_usd;
}

function calculate_cost_usd_gb_storage(usage_config: UsageConfig): USD {
    const cycles_per_gb: Cycles = CYCLE_COST_TABLE.GB_STORAGE_PER_SECOND;
    const cycles_per_year: Cycles =
        SECONDS_PER_YEAR * cycles_per_gb * usage_config.gb_storage;
    const cost_usd: USD = cycles_per_year * USD_PER_CYCLE;

    return cost_usd;
}

function calculate_cost_usd_compute_percent_allocated_per_second(): USD {
    const cycles_per_compute_percent: Cycles =
        CYCLE_COST_TABLE.COMPUTE_PERCENT_ALLOCATED_PER_SECOND; // TODO this assumes 100% compute allocation, is this accurate?
    const cycles_per_year: Cycles =
        SECONDS_PER_YEAR * cycles_per_compute_percent;
    const cost_usd: USD = cycles_per_year * USD_PER_CYCLE;

    return cost_usd;
}

function calculate_cost_usd_update_instructions(
    usage_config: UsageConfig,
    wasm_instructions_per_update_message: number
): USD {
    const cycles_per_update_message: Cycles =
        (CYCLE_COST_TABLE.TEN_UPDATE_INSTRUCTIONS_EXECUTION *
            wasm_instructions_per_update_message) /
        10;
    const update_messages_per_year =
        SECONDS_PER_YEAR * usage_config.update_messages_per_second;
    const cycles_per_year: Cycles =
        update_messages_per_year * cycles_per_update_message;
    const cost_usd: USD = cycles_per_year * USD_PER_CYCLE;

    return cost_usd;
}
