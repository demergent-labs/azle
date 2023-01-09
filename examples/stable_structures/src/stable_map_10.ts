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

type StableMap10InsertResult = Variant<{
    ok: Opt<Opt<boolean>>;
    err: InsertError;
}>;

let stable_map_10 = new StableBTreeMap<float32, Opt<boolean>>(10, 100, 1_000);

export function stable_map_10_contains_key(key: float32): Query<boolean> {
    return stable_map_10.contains_key(key);
}

export function stable_map_10_get(key: float32): Query<Opt<Opt<boolean>>> {
    return stable_map_10.get(key);
}

export function stable_map_10_insert(
    key: float32,
    value: Opt<boolean>
): Update<StableMap10InsertResult> {
    return stable_map_10.insert(key, value);
}

export function stable_map_10_is_empty(): Query<boolean> {
    return stable_map_10.is_empty();
}

export function stable_map_10_len(): Query<nat64> {
    return stable_map_10.len();
}

export function stable_map_10_remove(key: float32): Update<Opt<Opt<boolean>>> {
    return stable_map_10.remove(key);
}
