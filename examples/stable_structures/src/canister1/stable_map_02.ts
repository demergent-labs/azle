import {
    InsertError,
    nat,
    nat32,
    nat64,
    Opt,
    $query,
    StableBTreeMap,
    $update,
    Variant
} from 'azle';

type StableMap2InsertResult = Variant<{
    ok: Opt<nat>;
    err: InsertError;
}>;

let stable_map_2 = new StableBTreeMap<nat32, nat>(2, 100, 1_000);

$query;
export function stable_map_2_contains_key(key: nat32): boolean {
    return stable_map_2.contains_key(key);
}

$query;
export function stable_map_2_get(key: nat32): Opt<nat> {
    return stable_map_2.get(key);
}

$update;
export function stable_map_2_insert(
    key: nat32,
    value: nat
): StableMap2InsertResult {
    return stable_map_2.insert(key, value);
}

$query;
export function stable_map_2_is_empty(): boolean {
    return stable_map_2.is_empty();
}

$query;
export function stable_map_2_items(): [nat32, nat][] {
    return stable_map_2.items();
}

$query;
export function stable_map_2_keys(): nat32[] {
    return stable_map_2.keys();
}

$query;
export function stable_map_2_len(): nat64 {
    return stable_map_2.len();
}

$update;
export function stable_map_2_remove(key: nat32): Opt<nat> {
    return stable_map_2.remove(key);
}

$query;
export function stable_map_2_values(): nat[] {
    return stable_map_2.values();
}
