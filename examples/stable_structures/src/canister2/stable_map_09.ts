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

type StableMap9InsertResult = Variant<{
    Ok: Opt<string[]>;
    Err: InsertError;
}>;

let stable_map_9 = new StableBTreeMap<float64, string[]>(9, 100, 1_000);

$query;
export function stable_map_9_contains_key(key: float64): boolean {
    return stable_map_9.containsKey(key);
}

$query;
export function stable_map_9_get(key: float64): Opt<string[]> {
    return stable_map_9.get(key);
}

$update;
export function stable_map_9_insert(
    key: float64,
    value: string[]
): StableMap9InsertResult {
    return stable_map_9.insert(key, value);
}

$query;
export function stable_map_9_is_empty(): boolean {
    return stable_map_9.isEmpty();
}

$query;
export function stable_map_9_items(): [float64, string[]][] {
    return stable_map_9.items();
}

$query;
export function stable_map_9_keys(): float64[] {
    return stable_map_9.keys();
}

$query;
export function stable_map_9_len(): nat64 {
    return stable_map_9.len();
}

$update;
export function stable_map_9_remove(key: float64): Opt<string[]> {
    return stable_map_9.remove(key);
}

$query;
export function stable_map_9_values(): string[][] {
    return stable_map_9.values();
}
