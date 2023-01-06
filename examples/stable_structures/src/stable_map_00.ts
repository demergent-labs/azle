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

export type StableMap0InsertResult = Variant<{
    ok: Opt<string>;
    err: InsertError;
}>;

export let stable_map_0 = new StableBTreeMap<nat8, string>(0, 100, 100);

export function contains_key_stable_map_0(key: nat8): Query<boolean> {
    return stable_map_0.contains_key(key);
}

export function get_stable_map_0(key: nat8): Query<Opt<string>> {
    return stable_map_0.get(key);
}

export function set_stable_map_0(
    key: nat8,
    value: string
): Update<StableMap0InsertResult> {
    return stable_map_0.insert(key, value);
}

export function is_empty_stable_map_0(): Query<boolean> {
    return stable_map_0.is_empty();
}

export function len_stable_map_0(): Query<nat64> {
    return stable_map_0.len();
}

export function remove_stable_map_0(key: nat8): Update<Opt<string>> {
    return stable_map_0.remove(key);
}
