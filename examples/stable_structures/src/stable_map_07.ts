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

export function stable_map_7_contains_key(key: null): Query<boolean> {
    return stable_map_7.contains_key(key);
}

export function stable_map_7_get(key: null): Query<Opt<null>> {
    return stable_map_7.get(key);
}

export function stable_map_7_insert(
    key: null,
    value: null
): Update<StableMap7InsertResult> {
    return stable_map_7.insert(key, value);
}

export function stable_map_7_is_empty(): Query<boolean> {
    return stable_map_7.is_empty();
}

export function stable_map_7_len(): Query<nat64> {
    return stable_map_7.len();
}

export function stable_map_7_remove(key: null): Update<Opt<null>> {
    return stable_map_7.remove(key);
}
