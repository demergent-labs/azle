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

type StableMap0InsertResult = Variant<{
    ok: Opt<string>;
    err: InsertError;
}>;

let stable_map_0 = new StableBTreeMap<nat8, string>(0, 100, 100);

export function stable_map_0_contains_key(key: nat8): Query<boolean> {
    return stable_map_0.contains_key(key);
}

export function stable_map_0_get(key: nat8): Query<Opt<string>> {
    return stable_map_0.get(key);
}

export function stable_map_0_insert(
    key: nat8,
    value: string
): Update<StableMap0InsertResult> {
    return stable_map_0.insert(key, value);
}

export function stable_map_0_is_empty(): Query<boolean> {
    return stable_map_0.is_empty();
}

export function stable_map_0_items(): Update<[nat8, string][]> {
    return stable_map_0.items();
}

export function stable_map_0_keys(): Update<nat8[]> {
    return stable_map_0.keys();
}

export function stable_map_0_len(): Query<nat64> {
    return stable_map_0.len();
}

export function stable_map_0_remove(key: nat8): Update<Opt<string>> {
    return stable_map_0.remove(key);
}

export function stable_map_0_values(): Update<string[]> {
    return stable_map_0.values();
}
