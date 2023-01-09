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

export function stable_map_8_contains_key(key: boolean): Query<boolean> {
    return stable_map_8.contains_key(key);
}

export function stable_map_8_get(key: boolean): Query<Opt<null>> {
    return stable_map_8.get(key);
}

export function stable_map_8_insert(
    key: boolean,
    value: null
): Update<StableMap8InsertResult> {
    return stable_map_8.insert(key, value);
}

export function stable_map_8_is_empty(): Query<boolean> {
    return stable_map_8.is_empty();
}

export function stable_map_8_len(): Query<nat64> {
    return stable_map_8.len();
}

export function stable_map_8_remove(key: boolean): Update<Opt<null>> {
    return stable_map_8.remove(key);
}
