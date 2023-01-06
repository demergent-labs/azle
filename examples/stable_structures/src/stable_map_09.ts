import {
    float64,
    InsertError,
    nat64,
    Opt,
    Query,
    StableBTreeMap,
    Update,
    Variant
} from 'azle';

export type StableMap9InsertResult = Variant<{
    ok: Opt<string[]>;
    err: InsertError;
}>;

export let stable_map_9 = new StableBTreeMap<float64, string[]>(9, 100, 1_000);

export function contains_key_stable_map_9(key: float64): Query<boolean> {
    return stable_map_9.contains_key(key);
}

export function get_stable_map_9(key: float64): Query<Opt<string[]>> {
    return stable_map_9.get(key);
}

export function set_stable_map_9(
    key: float64,
    value: string[]
): Update<StableMap9InsertResult> {
    return stable_map_9.insert(key, value);
}

export function is_empty_stable_map_9(): Query<boolean> {
    return stable_map_9.is_empty();
}

export function len_stable_map_9(): Query<nat64> {
    return stable_map_9.len();
}

export function remove_stable_map_9(key: float64): Update<Opt<string[]>> {
    return stable_map_9.remove(key);
}
