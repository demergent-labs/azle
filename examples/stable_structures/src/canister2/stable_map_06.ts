import {
    InsertError,
    nat64,
    Opt,
    $query,
    StableBTreeMap,
    $update,
    Variant
} from 'azle';

type StableMap6InsertResult = Variant<{
    ok: Opt<boolean>;
    err: InsertError;
}>;

let stable_map_6 = new StableBTreeMap<nat64[], boolean>(6, 100, 1_000);

$query;
export function stable_map_6_contains_key(key: nat64[]): boolean {
    return stable_map_6.containsKey(key);
}

$query;
export function stable_map_6_get(key: nat64[]): Opt<boolean> {
    return stable_map_6.get(key);
}

$update;
export function stable_map_6_insert(
    key: nat64[],
    value: boolean
): StableMap6InsertResult {
    return stable_map_6.insert(key, value);
}

$query;
export function stable_map_6_is_empty(): boolean {
    return stable_map_6.isEmpty();
}

$query;
export function stable_map_6_items(): [nat64[], boolean][] {
    return stable_map_6.items();
}

$query;
export function stable_map_6_keys(): nat64[][] {
    return stable_map_6.keys();
}

$query;
export function stable_map_6_len(): nat64 {
    return stable_map_6.len();
}

$update;
export function stable_map_6_remove(key: nat64[]): Opt<boolean> {
    return stable_map_6.remove(key);
}

$query;
export function stable_map_6_values(): boolean[] {
    return stable_map_6.values();
}
