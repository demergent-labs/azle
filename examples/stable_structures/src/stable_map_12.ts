import {
    blob,
    InsertError,
    nat64,
    Opt,
    Query,
    StableBTreeMap,
    Update,
    Variant
} from 'azle';
import { Reaction } from './types';

export type StableMap12InsertResult = Variant<{
    ok: Opt<Reaction>;
    err: InsertError;
}>;

export let stable_map_12 = new StableBTreeMap<blob, Reaction>(12, 100, 1_000);

export function contains_key_stable_map_12(key: blob): Query<boolean> {
    return stable_map_12.contains_key(key);
}

export function get_stable_map_12(key: blob): Query<Opt<Reaction>> {
    return stable_map_12.get(key);
}

export function insert_stable_map_12(
    key: blob,
    value: Reaction
): Update<StableMap12InsertResult> {
    return stable_map_12.insert(key, value);
}

export function is_empty_stable_map_12(): Query<boolean> {
    return stable_map_12.is_empty();
}

export function len_stable_map_12(): Query<nat64> {
    return stable_map_12.len();
}

export function remove_stable_map_12(key: blob): Update<Opt<Reaction>> {
    return stable_map_12.remove(key);
}
