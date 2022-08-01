export type UsageConfig = {
    ingress_bytes_per_query_message: number;
    ingress_bytes_per_update_message: number;
    gb_storage: number;
    query_messages_per_second: number;
    update_messages_per_second: number;
    xnet_calls_per_second: number;
    xnet_call_bytes: number;
};

const USAGE_CONFIG_LIGHT: UsageConfig = {
    ingress_bytes_per_query_message: 100,
    ingress_bytes_per_update_message: 100,
    gb_storage: 0.5,
    query_messages_per_second: 0.01,
    update_messages_per_second: 0.01,
    xnet_calls_per_second: 0.001,
    xnet_call_bytes: 20
};

const USAGE_CONFIG_MODERATE: UsageConfig = {
    ingress_bytes_per_query_message: 1_000,
    ingress_bytes_per_update_message: 1_000,
    gb_storage: 1,
    query_messages_per_second: 1,
    update_messages_per_second: 1,
    xnet_calls_per_second: 0.1,
    xnet_call_bytes: 200
};

const USAGE_CONFIG_HEAVY: UsageConfig = {
    ingress_bytes_per_query_message: 10_000,
    ingress_bytes_per_update_message: 10_000,
    gb_storage: 2,
    query_messages_per_second: 100,
    update_messages_per_second: 100,
    xnet_calls_per_second: 10,
    xnet_call_bytes: 2_000
};

export const USAGE_CONFIG_LIGHT_QUERY_UPDATE_EVEN: UsageConfig =
    USAGE_CONFIG_LIGHT;
export const USAGE_CONFIG_LIGHT_QUERY_HEAVY: UsageConfig = {
    ...USAGE_CONFIG_LIGHT,
    update_messages_per_second:
        USAGE_CONFIG_LIGHT.update_messages_per_second / 100
};
export const USAGE_CONFIG_LIGHT_UPDATE_HEAVY: UsageConfig = {
    ...USAGE_CONFIG_LIGHT,
    query_messages_per_second:
        USAGE_CONFIG_LIGHT.query_messages_per_second / 100
};

export const USAGE_CONFIG_MODERATE_QUERY_UPDATE_EVEN: UsageConfig =
    USAGE_CONFIG_MODERATE;
export const USAGE_CONFIG_MODERATE_QUERY_HEAVY: UsageConfig = {
    ...USAGE_CONFIG_MODERATE,
    update_messages_per_second:
        USAGE_CONFIG_MODERATE.update_messages_per_second / 100
};
export const USAGE_CONFIG_MODERATE_UPDATE_HEAVY: UsageConfig = {
    ...USAGE_CONFIG_MODERATE,
    query_messages_per_second:
        USAGE_CONFIG_MODERATE.query_messages_per_second / 100
};

export const USAGE_CONFIG_HEAVY_QUERY_UPDATE_EVEN: UsageConfig =
    USAGE_CONFIG_HEAVY;
export const USAGE_CONFIG_HEAVY_QUERY_HEAVY: UsageConfig = {
    ...USAGE_CONFIG_HEAVY,
    update_messages_per_second:
        USAGE_CONFIG_HEAVY.update_messages_per_second / 100
};
export const USAGE_CONFIG_HEAVY_UPDATE_HEAVY: UsageConfig = {
    ...USAGE_CONFIG_HEAVY,
    query_messages_per_second:
        USAGE_CONFIG_HEAVY.query_messages_per_second / 100
};
