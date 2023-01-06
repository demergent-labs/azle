import {
    InsertError,
    nat64,
    Opt,
    Query,
    StableBTreeMap,
    Update,
    Variant
} from 'azle';

export type StableMap7InsertResult = Variant<{
    ok: Opt<null>;
    err: InsertError;
}>;

export let stable_map_7 = new StableBTreeMap<null, null>(7, 100, 1_000);

export function contains_key_stable_map_7(key: null): Query<boolean> {
    return stable_map_7.contains_key(key);
}

export function get_stable_map_7(key: null): Query<Opt<null>> {
    return stable_map_7.get(key);
}

export function set_stable_map_7(
    key: null,
    value: null
): Update<StableMap7InsertResult> {
    return stable_map_7.insert(key, value);
}

export function is_empty_stable_map_7(): Query<boolean> {
    return stable_map_7.is_empty();
}

export function len_stable_map_7(): Query<nat64> {
    return stable_map_7.len();
}

export function remove_stable_map_7(key: null): Update<Opt<null>> {
    return stable_map_7.remove(key);
}
