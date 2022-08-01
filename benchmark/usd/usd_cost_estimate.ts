import { CYCLE_COST_TABLE, USD_PER_CYCLE } from './cycle_costs';
import { UsageConfig } from './usage_config';

const SECONDS_PER_YEAR = 365 * 24 * 60 * 60;

export type USDCostEstimates = {
    azle: USDCostEstimateUsageGroup;
    motoko: USDCostEstimateUsageGroup;
    rust: USDCostEstimateUsageGroup;
};

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

type USD = number;
type Cycles = number;

export type USDCostEstimate = {
    ingress_messages: USD;
    ingress_bytes_query_messages: USD;
    ingress_bytes_update_messages: USD;
    update_messages: USD;
    update_instructions: USD;
    xnet_calls: USD;
    xnet_call_bytes: USD;
    gb_storage: USD;
    total_cost: USD;
    // TODO Do we want these here? It might be good enough to just let the users figure this out on their own
    // azle_motoko_change_multiplier: number;
    // azle_rust_change_multiplier: number;
    // motoko_azle_change_multiplier: number;
    // motoko_rust_change_multiplier: number;
    // rust_azle_change_multiplier: number;
    // rust_motoko_change_multiplier: number;
};

export function get_usd_cost_estimate(
    usage_config: UsageConfig,
    wasm_instructions_per_update_message: number
): USDCostEstimate {
    const ingress_messages_cost_usd: USD =
        calculate_cost_usd_ingress_messages(usage_config);
    const ingress_bytes_query_messages_cost_usd: USD =
        calculate_cost_usd_ingress_bytes_query_messages(usage_config);
    const ingress_bytes_update_messages_cost_usd: USD =
        calculate_cost_usd_ingress_bytes_update_messages(usage_config);
    const update_messages_cost_usd: USD =
        calculate_cost_usd_update_messages(usage_config);
    const update_instructions_cost_usd: USD =
        calculate_cost_usd_update_instructions(
            usage_config,
            wasm_instructions_per_update_message
        );
    const xnet_calls_cost_usd: USD =
        calculate_cost_usd_xnet_calls(usage_config);
    const xnet_bytes_cost_usd: USD =
        calculate_cost_usd_xnet_bytes(usage_config);
    const gb_storage_cost_usd: USD =
        calculate_cost_usd_gb_storage(usage_config);
    const total_cost_usd: USD =
        ingress_messages_cost_usd +
        ingress_bytes_query_messages_cost_usd +
        ingress_bytes_update_messages_cost_usd +
        update_messages_cost_usd +
        update_instructions_cost_usd +
        xnet_calls_cost_usd +
        xnet_bytes_cost_usd +
        gb_storage_cost_usd;

    return {
        ingress_messages: ingress_messages_cost_usd,
        ingress_bytes_query_messages: ingress_bytes_query_messages_cost_usd,
        ingress_bytes_update_messages: ingress_bytes_update_messages_cost_usd,
        update_messages: update_messages_cost_usd,
        update_instructions: update_instructions_cost_usd,
        xnet_calls: xnet_calls_cost_usd,
        xnet_call_bytes: xnet_bytes_cost_usd,
        gb_storage: gb_storage_cost_usd,
        total_cost: total_cost_usd
    };
}

function calculate_cost_usd_ingress_messages(usage_config: UsageConfig): USD {
    const query_messages_per_year =
        SECONDS_PER_YEAR * usage_config.query_messages_per_second;
    const update_messages_per_year =
        SECONDS_PER_YEAR * usage_config.update_messages_per_second;
    const cycles_per_year: Cycles =
        CYCLE_COST_TABLE.INGRESS_MESSAGE_RECEPTION *
        (query_messages_per_year + update_messages_per_year);
    const cost_usd: USD = cycles_per_year * USD_PER_CYCLE;

    return cost_usd;
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
    const update_messages_per_year =
        SECONDS_PER_YEAR * usage_config.update_messages_per_second;
    const cycles_per_year: Cycles =
        CYCLE_COST_TABLE.UPDATE_MESSAGE_EXECUTION * update_messages_per_year;
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
        cycles_per_update_message * update_messages_per_year;
    const cost_usd: USD = cycles_per_year * USD_PER_CYCLE;

    return cost_usd;
}

function calculate_cost_usd_xnet_calls(usage_config: UsageConfig): USD {
    const xnet_calls_per_year =
        SECONDS_PER_YEAR * usage_config.xnet_calls_per_second;
    const cycles_per_year: Cycles =
        CYCLE_COST_TABLE.XNET_CALL * xnet_calls_per_year;
    const cost_usd: USD = cycles_per_year * USD_PER_CYCLE;

    return cost_usd;
}

function calculate_cost_usd_xnet_bytes(usage_config: UsageConfig): USD {
    const cycles_per_xnet_call: Cycles =
        CYCLE_COST_TABLE.XNET_BYTE_TRANSMISSION * usage_config.xnet_call_bytes;
    const xnet_calls_per_year =
        SECONDS_PER_YEAR * usage_config.xnet_calls_per_second;
    const cycles_per_year: Cycles = cycles_per_xnet_call * xnet_calls_per_year;
    const cost_usd: USD = cycles_per_year * USD_PER_CYCLE;

    return cost_usd;
}

function calculate_cost_usd_gb_storage(usage_config: UsageConfig): USD {
    const gb_seconds_per_year = SECONDS_PER_YEAR * usage_config.gb_storage;
    const cycles_per_year: Cycles =
        CYCLE_COST_TABLE.GB_STORAGE_PER_SECOND * gb_seconds_per_year;
    const cost_usd: USD = cycles_per_year * USD_PER_CYCLE;

    return cost_usd;
}
