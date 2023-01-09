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

export function stable_map_9_contains_key(key: float64): Query<boolean> {
    return stable_map_9.contains_key(key);
}

export function stable_map_9_get(key: float64): Query<Opt<string[]>> {
    return stable_map_9.get(key);
}

export function stable_map_9_insert(
    key: float64,
    value: string[]
): Update<StableMap9InsertResult> {
    return stable_map_9.insert(key, value);
}

export function stable_map_9_is_empty(): Query<boolean> {
    return stable_map_9.is_empty();
}

export function stable_map_9_len(): Query<nat64> {
    return stable_map_9.len();
}

export function stable_map_9_remove(key: float64): Update<Opt<string[]>> {
    return stable_map_9.remove(key);
}
