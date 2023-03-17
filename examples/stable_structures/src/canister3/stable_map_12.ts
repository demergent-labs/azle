import {
    blob,
    InsertError,
    nat64,
    Opt,
    $query,
    StableBTreeMap,
    $update,
    Variant
} from 'azle';
import { Reaction } from '../types';

type StableMap12InsertResult = Variant<{
    ok: Opt<Reaction>;
    err: InsertError;
}>;

let stable_map_12 = new StableBTreeMap<blob, Reaction>(12, 100, 1_000);

$query;
export function stable_map_12_contains_key(key: blob): boolean {
    return stable_map_12.containsKey(key);
}

$query;
export function stable_map_12_get(key: blob): Opt<Reaction> {
    return stable_map_12.get(key);
}

$update;
export function stable_map_12_insert(
    key: blob,
    value: Reaction
): StableMap12InsertResult {
    return stable_map_12.insert(key, value);
}

$query;
export function stable_map_12_is_empty(): boolean {
    return stable_map_12.isEmpty();
}

$query;
export function stable_map_12_items(): [blob, Reaction][] {
    return stable_map_12.items();
}

$query;
export function stable_map_12_keys(): blob[] {
    return stable_map_12.keys();
}

$query;
export function stable_map_12_len(): nat64 {
    return stable_map_12.len();
}

$update;
export function stable_map_12_remove(key: blob): Opt<Reaction> {
    return stable_map_12.remove(key);
}

$query;
export function stable_map_12_values(): Reaction[] {
    return stable_map_12.values();
}
