import {
    float64,
    InsertError,
    nat64,
    Opt,
    Query,
    StableBTreeMap,
    Update,
    Variant
} from 'azle';

export type StableMap5InsertResult = Variant<{
    ok: Opt<float64>;
    err: InsertError;
}>;

export let stable_map_5 = new StableBTreeMap<Opt<String>, float64>(
    5,
    100,
    1_000
);

export function contains_key_stable_map_5(key: Opt<String>): Query<boolean> {
    return stable_map_5.contains_key(key);
}

export function get_stable_map_5(key: Opt<String>): Query<Opt<float64>> {
    return stable_map_5.get(key);
}

export function insert_stable_map_5(
    key: Opt<String>,
    value: float64
): Update<StableMap5InsertResult> {
    return stable_map_5.insert(key, value);
}

export function is_empty_stable_map_5(): Query<boolean> {
    return stable_map_5.is_empty();
}

export function len_stable_map_5(): Query<nat64> {
    return stable_map_5.len();
}

export function remove_stable_map_5(key: Opt<String>): Update<Opt<float64>> {
    return stable_map_5.remove(key);
}
