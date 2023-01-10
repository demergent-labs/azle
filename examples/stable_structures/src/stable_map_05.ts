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

type StableMap5InsertResult = Variant<{
    ok: Opt<float64>;
    err: InsertError;
}>;

let stable_map_5 = new StableBTreeMap<Opt<String>, float64>(5, 100, 1_000);

export function stable_map_5_contains_key(key: Opt<String>): Query<boolean> {
    return stable_map_5.contains_key(key);
}

export function stable_map_5_get(key: Opt<String>): Query<Opt<float64>> {
    return stable_map_5.get(key);
}

export function stable_map_5_insert(
    key: Opt<String>,
    value: float64
): Update<StableMap5InsertResult> {
    return stable_map_5.insert(key, value);
}

export function stable_map_5_is_empty(): Query<boolean> {
    return stable_map_5.is_empty();
}

export function stable_map_5_items(): Update<[Opt<String>, float64][]> {
    return stable_map_5.items();
}

export function stable_map_5_keys(): Update<Opt<String>[]> {
    return stable_map_5.keys();
}

export function stable_map_5_len(): Query<nat64> {
    return stable_map_5.len();
}

export function stable_map_5_remove(key: Opt<String>): Update<Opt<float64>> {
    return stable_map_5.remove(key);
}

export function stable_map_5_values(): Update<float64[]> {
    return stable_map_5.values();
}
