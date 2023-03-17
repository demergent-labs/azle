import {
    InsertError,
    nat64,
    nat8,
    Opt,
    $query,
    StableBTreeMap,
    $update,
    Variant
} from 'azle';

type StableMap0InsertResult = Variant<{
    Ok: Opt<string>;
    Err: InsertError;
}>;

let stable_map_0 = new StableBTreeMap<nat8, string>(0, 100, 100);

$query;
export function stable_map_0_contains_key(key: nat8): boolean {
    return stable_map_0.containsKey(key);
}

$query;
export function stable_map_0_get(key: nat8): Opt<string> {
    return stable_map_0.get(key);
}

$update;
export function stable_map_0_insert(
    key: nat8,
    value: string
): StableMap0InsertResult {
    return stable_map_0.insert(key, value);
}

$query;
export function stable_map_0_is_empty(): boolean {
    return stable_map_0.isEmpty();
}

$query;
export function stable_map_0_items(): [nat8, string][] {
    return stable_map_0.items();
}

$query;
export function stable_map_0_keys(): nat8[] {
    return stable_map_0.keys();
}

$query;
export function stable_map_0_len(): nat64 {
    return stable_map_0.len();
}

$update;
export function stable_map_0_remove(key: nat8): Opt<string> {
    return stable_map_0.remove(key);
}

$query;
export function stable_map_0_values(): string[] {
    return stable_map_0.values();
}
