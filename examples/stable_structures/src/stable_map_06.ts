import {
    InsertError,
    nat64,
    Opt,
    Query,
    StableBTreeMap,
    Update,
    Variant
} from 'azle';

export type StableMap6InsertResult = Variant<{
    ok: Opt<boolean>;
    err: InsertError;
}>;

export let stable_map_6 = new StableBTreeMap<nat64[], boolean>(6, 100, 1_000);

export function contains_key_stable_map_6(key: nat64[]): Query<boolean> {
    return stable_map_6.contains_key(key);
}

export function get_stable_map_6(key: nat64[]): Query<Opt<boolean>> {
    return stable_map_6.get(key);
}

export function insert_stable_map_6(
    key: nat64[],
    value: boolean
): Update<StableMap6InsertResult> {
    return stable_map_6.insert(key, value);
}

export function is_empty_stable_map_6(): Query<boolean> {
    return stable_map_6.is_empty();
}

export function len_stable_map_6(): Query<nat64> {
    return stable_map_6.len();
}

export function remove_stable_map_6(key: nat64[]): Update<Opt<boolean>> {
    return stable_map_6.remove(key);
}
