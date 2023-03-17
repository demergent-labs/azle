import {
    InsertError,
    nat64,
    Opt,
    $query,
    StableBTreeMap,
    $update,
    Variant
} from 'azle';

type StableMap7InsertResult = Variant<{
    Ok: Opt<null>;
    Err: InsertError;
}>;

let stable_map_7 = new StableBTreeMap<null, null>(7, 100, 1_000);

$query;
export function stable_map_7_contains_key(key: null): boolean {
    return stable_map_7.containsKey(key);
}

$query;
export function stable_map_7_get(key: null): Opt<null> {
    return stable_map_7.get(key);
}

$update;
export function stable_map_7_insert(
    key: null,
    value: null
): StableMap7InsertResult {
    return stable_map_7.insert(key, value);
}

$query;
export function stable_map_7_is_empty(): boolean {
    return stable_map_7.isEmpty();
}

$query;
export function stable_map_7_items(): [null, null][] {
    return stable_map_7.items();
}

$query;
export function stable_map_7_keys(): null[] {
    return stable_map_7.keys();
}

$query;
export function stable_map_7_len(): nat64 {
    return stable_map_7.len();
}

$update;
export function stable_map_7_remove(key: null): Opt<null> {
    return stable_map_7.remove(key);
}

$query;
export function stable_map_7_values(): null[] {
    return stable_map_7.values();
}
