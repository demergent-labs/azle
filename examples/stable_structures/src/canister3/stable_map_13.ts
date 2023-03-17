import {
    InsertError,
    nat64,
    Opt,
    Principal,
    $query,
    StableBTreeMap,
    $update,
    Variant
} from 'azle';

type StableMap13InsertResult = Variant<{
    ok: Opt<Principal>;
    err: InsertError;
}>;

let stable_map_13 = new StableBTreeMap<string, Principal>(13, 100, 1_000);

$query;
export function stable_map_13_contains_key(key: string): boolean {
    return stable_map_13.containsKey(key);
}

$query;
export function stable_map_13_get(key: string): Opt<Principal> {
    return stable_map_13.get(key);
}

$update;
export function stable_map_13_insert(
    key: string,
    value: Principal
): StableMap13InsertResult {
    return stable_map_13.insert(key, value);
}

$query;
export function stable_map_13_is_empty(): boolean {
    return stable_map_13.isEmpty();
}

$query;
export function stable_map_13_items(): [string, Principal][] {
    return stable_map_13.items();
}

$query;
export function stable_map_13_keys(): string[] {
    return stable_map_13.keys();
}

$query;
export function stable_map_13_len(): nat64 {
    return stable_map_13.len();
}

$update;
export function stable_map_13_remove(key: string): Opt<Principal> {
    return stable_map_13.remove(key);
}

$query;
export function stable_map_13_values(): Principal[] {
    return stable_map_13.values();
}
