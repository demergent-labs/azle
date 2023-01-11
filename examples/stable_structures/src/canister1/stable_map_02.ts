import {
    InsertError,
    nat,
    nat32,
    nat64,
    Opt,
    Query,
    StableBTreeMap,
    Update,
    Variant
} from 'azle';

type StableMap2InsertResult = Variant<{
    ok: Opt<nat>;
    err: InsertError;
}>;

let stable_map_2 = new StableBTreeMap<nat32, nat>(2, 100, 1_000);

export function stable_map_2_contains_key(key: nat32): Query<boolean> {
    return stable_map_2.contains_key(key);
}

export function stable_map_2_get(key: nat32): Query<Opt<nat>> {
    return stable_map_2.get(key);
}

export function stable_map_2_insert(
    key: nat32,
    value: nat
): Update<StableMap2InsertResult> {
    return stable_map_2.insert(key, value);
}

export function stable_map_2_is_empty(): Query<boolean> {
    return stable_map_2.is_empty();
}

export function stable_map_2_items(): Query<[nat32, nat][]> {
    return stable_map_2.items();
}

export function stable_map_2_keys(): Query<nat32[]> {
    return stable_map_2.keys();
}

export function stable_map_2_len(): Query<nat64> {
    return stable_map_2.len();
}

export function stable_map_2_remove(key: nat32): Update<Opt<nat>> {
    return stable_map_2.remove(key);
}

export function stable_map_2_values(): Query<nat[]> {
    return stable_map_2.values();
}
