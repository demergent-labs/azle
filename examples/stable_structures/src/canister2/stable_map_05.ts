import {
    float64,
    InsertError,
    nat64,
    Opt,
    $query,
    StableBTreeMap,
    $update,
    Variant
} from 'azle';

type StableMap5InsertResult = Variant<{
    ok: Opt<float64>;
    err: InsertError;
}>;

let stable_map_5 = new StableBTreeMap<Opt<String>, float64>(5, 100, 1_000);

$query;
export function stable_map_5_contains_key(key: Opt<String>): boolean {
    return stable_map_5.contains_key(key);
}

$query;
export function stable_map_5_get(key: Opt<String>): Opt<float64> {
    return stable_map_5.get(key);
}

$update;
export function stable_map_5_insert(
    key: Opt<String>,
    value: float64
): StableMap5InsertResult {
    return stable_map_5.insert(key, value);
}

$query;
export function stable_map_5_is_empty(): boolean {
    return stable_map_5.is_empty();
}

$query;
export function stable_map_5_items(): [Opt<String>, float64][] {
    return stable_map_5.items();
}

$query;
export function stable_map_5_keys(): Opt<String>[] {
    return stable_map_5.keys();
}

$query;
export function stable_map_5_len(): nat64 {
    return stable_map_5.len();
}

$update;
export function stable_map_5_remove(key: Opt<String>): Opt<float64> {
    return stable_map_5.remove(key);
}

$query;
export function stable_map_5_values(): float64[] {
    return stable_map_5.values();
}
