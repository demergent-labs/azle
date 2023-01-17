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
import { Reaction } from '../types';

type StableMap12InsertResult = Variant<{
    ok: Opt<Reaction>;
    err: InsertError;
}>;

let stable_map_12 = new StableBTreeMap<blob, Reaction>(12, 100, 1_000);

export function stable_map_12_contains_key(key: blob): Query<boolean> {
    return stable_map_12.contains_key(key);
}

export function stable_map_12_get(key: blob): Query<Opt<Reaction>> {
    return stable_map_12.get(key);
}

export function stable_map_12_insert(
    key: blob,
    value: Reaction
): Update<StableMap12InsertResult> {
    return stable_map_12.insert(key, value);
}

export function stable_map_12_is_empty(): Query<boolean> {
    return stable_map_12.is_empty();
}

export function stable_map_12_items(): Query<[blob, Reaction][]> {
    return stable_map_12.items();
}

export function stable_map_12_keys(): Query<blob[]> {
    return stable_map_12.keys();
}

export function stable_map_12_len(): Query<nat64> {
    return stable_map_12.len();
}

export function stable_map_12_remove(key: blob): Update<Opt<Reaction>> {
    return stable_map_12.remove(key);
}

export function stable_map_12_values(): Query<Reaction[]> {
    return stable_map_12.values();
}
