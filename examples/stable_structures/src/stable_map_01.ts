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

type StableMap1InsertResult = Variant<{
    ok: Opt<blob>;
    err: InsertError;
}>;

let stable_map_1 = new StableBTreeMap<nat16, blob>(1, 100, 1_000);

export function stable_map_1_contains_key(key: nat16): Query<boolean> {
    return stable_map_1.contains_key(key);
}

export function stable_map_1_get(key: nat16): Query<Opt<blob>> {
    return stable_map_1.get(key);
}

export function stable_map_1_insert(
    key: nat16,
    value: blob
): Update<StableMap1InsertResult> {
    return stable_map_1.insert(key, value);
}

export function stable_map_1_is_empty(): Query<boolean> {
    return stable_map_1.is_empty();
}

export function stable_map_1_items(): Update<[nat16, blob][]> {
    return stable_map_1.items();
}

export function stable_map_1_keys(): Update<nat16[]> {
    return stable_map_1.keys();
}

export function stable_map_1_len(): Query<nat64> {
    return stable_map_1.len();
}

export function stable_map_1_remove(key: nat16): Update<Opt<blob>> {
    return stable_map_1.remove(key);
}

export function stable_map_0_values(): Update<blob[]> {
    return stable_map_1.values();
}
