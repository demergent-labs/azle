import {
    InsertError,
    nat64,
    nat8,
    Opt,
    Query,
    StableBTreeMap,
    Update,
    Variant
} from 'azle';

export type StableMap8InsertResult = Variant<{
    ok: Opt<null>;
    err: InsertError;
}>;

export let stable_map_8 = new StableBTreeMap<boolean, null>(8, 100, 1_000);

export function contains_key_stable_map_8(key: boolean): Query<boolean> {
    return stable_map_8.contains_key(key);
}

export function get_stable_map_8(key: boolean): Query<Opt<null>> {
    return stable_map_8.get(key);
}

export function insert_stable_map_8(
    key: boolean,
    value: null
): Update<StableMap8InsertResult> {
    return stable_map_8.insert(key, value);
}

export function is_empty_stable_map_8(): Query<boolean> {
    return stable_map_8.is_empty();
}

export function len_stable_map_8(): Query<nat64> {
    return stable_map_8.len();
}

export function remove_stable_map_8(key: boolean): Update<Opt<null>> {
    return stable_map_8.remove(key);
}
