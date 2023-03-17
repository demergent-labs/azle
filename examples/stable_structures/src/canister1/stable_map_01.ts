import {
    blob,
    InsertError,
    nat16,
    nat64,
    Opt,
    $query,
    StableBTreeMap,
    $update,
    Variant
} from 'azle';

type StableMap1InsertResult = Variant<{
    Ok: Opt<blob>;
    Err: InsertError;
}>;

let stable_map_1 = new StableBTreeMap<nat16, blob>(1, 100, 1_000);

$query;
export function stable_map_1_contains_key(key: nat16): boolean {
    return stable_map_1.containsKey(key);
}

$query;
export function stable_map_1_get(key: nat16): Opt<blob> {
    return stable_map_1.get(key);
}

$update;
export function stable_map_1_insert(
    key: nat16,
    value: blob
): StableMap1InsertResult {
    return stable_map_1.insert(key, value);
}

$query;
export function stable_map_1_is_empty(): boolean {
    return stable_map_1.isEmpty();
}

$query;
export function stable_map_1_items(): [nat16, blob][] {
    return stable_map_1.items();
}

$query;
export function stable_map_1_keys(): nat16[] {
    return stable_map_1.keys();
}

$query;
export function stable_map_1_len(): nat64 {
    return stable_map_1.len();
}

$update;
export function stable_map_1_remove(key: nat16): Opt<blob> {
    return stable_map_1.remove(key);
}

$query;
export function stable_map_1_values(): blob[] {
    return stable_map_1.values();
}
