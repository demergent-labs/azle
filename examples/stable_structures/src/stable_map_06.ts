import {
    InsertError,
    nat64,
    Opt,
    Query,
    StableBTreeMap,
    Update,
    Variant
} from 'azle';

type StableMap6InsertResult = Variant<{
    ok: Opt<boolean>;
    err: InsertError;
}>;

let stable_map_6 = new StableBTreeMap<nat64[], boolean>(6, 100, 1_000);

export function stable_map_6_contains_key(key: nat64[]): Query<boolean> {
    return stable_map_6.contains_key(key);
}

export function stable_map_6_get(key: nat64[]): Query<Opt<boolean>> {
    return stable_map_6.get(key);
}

export function stable_map_6_insert(
    key: nat64[],
    value: boolean
): Update<StableMap6InsertResult> {
    return stable_map_6.insert(key, value);
}

export function stable_map_6_is_empty(): Query<boolean> {
    return stable_map_6.is_empty();
}

export function stable_map_6_items(): Query<[nat64[], boolean][]> {
    return stable_map_6.items();
}

export function stable_map_6_keys(): Query<nat64[][]> {
    return stable_map_6.keys();
}

export function stable_map_6_len(): Query<nat64> {
    return stable_map_6.len();
}

export function stable_map_6_remove(key: nat64[]): Update<Opt<boolean>> {
    return stable_map_6.remove(key);
}

export function stable_map_6_values(): Query<boolean[]> {
    return stable_map_6.values();
}
