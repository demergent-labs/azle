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

export function contains_key_stable_map_13(key: string): Query<boolean> {
    return stable_map_13.contains_key(key);
}

export function get_stable_map_13(key: string): Query<Opt<Principal>> {
    return stable_map_13.get(key);
}

export function set_stable_map_13(
    key: string,
    value: Principal
): Update<StableMap13InsertResult> {
    return stable_map_13.insert(key, value);
}

export function is_empty_stable_map_13(): Query<boolean> {
    return stable_map_13.is_empty();
}

export function len_stable_map_13(): Query<nat64> {
    return stable_map_13.len();
}

export function remove_stable_map_13(key: string): Update<Opt<Principal>> {
    return stable_map_13.remove(key);
}
