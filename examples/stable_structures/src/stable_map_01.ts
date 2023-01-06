import {
    blob,
    InsertError,
    nat16,
    nat64,
    Opt,
    Query,
    StableBTreeMap,
    Update,
    Variant
} from 'azle';

export type StableMap1InsertResult = Variant<{
    ok: Opt<blob>;
    err: InsertError;
}>;

export let stable_map_1 = new StableBTreeMap<nat16, blob>(1, 100, 1_000);

export function contains_key_stable_map_1(key: nat16): Query<boolean> {
    return stable_map_1.contains_key(key);
}

export function get_stable_map_1(key: nat16): Query<Opt<blob>> {
    return stable_map_1.get(key);
}

export function insert_stable_map_1(
    key: nat16,
    value: blob
): Update<StableMap1InsertResult> {
    return stable_map_1.insert(key, value);
}

export function is_empty_stable_map_1(): Query<boolean> {
    return stable_map_1.is_empty();
}

export function len_stable_map_1(): Query<nat64> {
    return stable_map_1.len();
}

export function remove_stable_map_1(key: nat16): Update<Opt<blob>> {
    return stable_map_1.remove(key);
}
