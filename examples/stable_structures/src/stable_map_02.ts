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

export type StableMap2InsertResult = Variant<{
    ok: Opt<nat>;
    err: InsertError;
}>;

export let stable_map_2 = new StableBTreeMap<nat32, nat>(2, 100, 1_000);

export function contains_key_stable_map_2(key: nat32): Query<boolean> {
    return stable_map_2.contains_key(key);
}

export function get_stable_map_2(key: nat32): Query<Opt<nat>> {
    return stable_map_2.get(key);
}

export function set_stable_map_2(
    key: nat32,
    value: nat
): Update<StableMap2InsertResult> {
    return stable_map_2.insert(key, value);
}

export function is_empty_stable_map_2(): Query<boolean> {
    return stable_map_2.is_empty();
}

export function len_stable_map_2(): Query<nat64> {
    return stable_map_2.len();
}

export function remove_stable_map_2(key: nat32): Update<Opt<nat>> {
    return stable_map_2.remove(key);
}
