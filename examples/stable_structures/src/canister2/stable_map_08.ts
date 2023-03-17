import {
    InsertError,
    nat64,
    Opt,
    $query,
    StableBTreeMap,
    $update,
    Variant
} from 'azle';

type StableMap8InsertResult = Variant<{
    ok: Opt<null>;
    err: InsertError;
}>;

let stable_map_8 = new StableBTreeMap<boolean, null>(8, 100, 1_000);

$query;
export function stable_map_8_contains_key(key: boolean): boolean {
    return stable_map_8.containsKey(key);
}

$query;
export function stable_map_8_get(key: boolean): Opt<null> {
    return stable_map_8.get(key);
}

$update;
export function stable_map_8_insert(
    key: boolean,
    value: null
): StableMap8InsertResult {
    return stable_map_8.insert(key, value);
}

$query;
export function stable_map_8_is_empty(): boolean {
    return stable_map_8.isEmpty();
}

$query;
export function stable_map_8_items(): [boolean, null][] {
    return stable_map_8.items();
}

$query;
export function stable_map_8_keys(): boolean[] {
    return stable_map_8.keys();
}

$query;
export function stable_map_8_len(): nat64 {
    return stable_map_8.len();
}

$update;
export function stable_map_8_remove(key: boolean): Opt<null> {
    return stable_map_8.remove(key);
}

$query;
export function stable_map_8_values(): null[] {
    return stable_map_8.values();
}
