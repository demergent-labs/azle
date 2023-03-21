import {
    float32,
    InsertError,
    nat64,
    Opt,
    $query,
    StableBTreeMap,
    $update,
    Variant
} from 'azle';

type StableMap10InsertResult = Variant<{
    Ok: Opt<Opt<boolean>>;
    Err: InsertError;
}>;

let stable_map_10 = new StableBTreeMap<float32, Opt<boolean>>(10, 100, 1_000);

$query;
export function stable_map_10_contains_key(key: float32): boolean {
    return stable_map_10.containsKey(key);
}

$query;
export function stable_map_10_get(key: float32): Opt<Opt<boolean>> {
    return stable_map_10.get(key);
}

$update;
export function stable_map_10_insert(
    key: float32,
    value: Opt<boolean>
): StableMap10InsertResult {
    return stable_map_10.insert(key, value);
}

$query;
export function stable_map_10_is_empty(): boolean {
    return stable_map_10.isEmpty();
}

$query;
export function stable_map_10_items(): [float32, Opt<boolean>][] {
    return stable_map_10.items();
}

$query;
export function stable_map_10_keys(): float32[] {
    return stable_map_10.keys();
}

$query;
export function stable_map_10_len(): nat64 {
    return stable_map_10.len();
}

$update;
export function stable_map_10_remove(key: float32): Opt<Opt<boolean>> {
    return stable_map_10.remove(key);
}

$query;
export function stable_map_10_values(): Opt<boolean>[] {
    return stable_map_10.values();
}
