import {
    InsertError,
    nat64,
    Opt,
    Principal,
    Query,
    StableBTreeMap,
    Update,
    Variant
} from 'azle';

export type StableMap13InsertResult = Variant<{
    ok: Opt<Principal>;
    err: InsertError;
}>;

export let stable_map_13 = new StableBTreeMap<string, Principal>(
    13,
    100,
    1_000
);

export function stable_map_13_contains_key(key: string): Query<boolean> {
    return stable_map_13.contains_key(key);
}

export function stable_map_13_get(key: string): Query<Opt<Principal>> {
    return stable_map_13.get(key);
}

export function stable_map_13_insert(
    key: string,
    value: Principal
): Update<StableMap13InsertResult> {
    return stable_map_13.insert(key, value);
}

export function stable_map_13_is_empty(): Query<boolean> {
    return stable_map_13.is_empty();
}

export function stable_map_13_len(): Query<nat64> {
    return stable_map_13.len();
}

export function stable_map_13_remove(key: string): Update<Opt<Principal>> {
    return stable_map_13.remove(key);
}
