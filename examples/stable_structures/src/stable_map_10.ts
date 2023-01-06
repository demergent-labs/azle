import {
    float32,
    InsertError,
    nat64,
    Opt,
    Query,
    StableBTreeMap,
    Update,
    Variant
} from 'azle';

export type StableMap10InsertResult = Variant<{
    ok: Opt<Opt<boolean>>;
    err: InsertError;
}>;

export let stable_map_10 = new StableBTreeMap<float32, Opt<boolean>>(
    10,
    100,
    1_000
);

export function contains_key_stable_map_10(key: float32): Query<boolean> {
    return stable_map_10.contains_key(key);
}

export function get_stable_map_10(key: float32): Query<Opt<Opt<boolean>>> {
    return stable_map_10.get(key);
}

export function insert_stable_map_10(
    key: float32,
    value: Opt<boolean>
): Update<StableMap10InsertResult> {
    return stable_map_10.insert(key, value);
}

export function is_empty_stable_map_10(): Query<boolean> {
    return stable_map_10.is_empty();
}

export function len_stable_map_10(): Query<nat64> {
    return stable_map_10.len();
}

export function remove_stable_map_10(key: float32): Update<Opt<Opt<boolean>>> {
    return stable_map_10.remove(key);
}
