import {
    InsertError,
    int,
    nat64,
    Opt,
    $query,
    StableBTreeMap,
    $update,
    Variant
} from 'azle';
import { Reaction } from '../types';

type StableMap3InsertResult = Variant<{
    ok: Opt<int>;
    err: InsertError;
}>;

let stable_map_3 = new StableBTreeMap<Reaction, int>(3, 100, 1_000);

$query;
export function stable_map_3_contains_key(key: Reaction): boolean {
    return stable_map_3.contains_key(key);
}

$query;
export function stable_map_3_get(key: Reaction): Opt<int> {
    return stable_map_3.get(key);
}

$update;
export function stable_map_3_insert(
    key: Reaction,
    value: int
): StableMap3InsertResult {
    return stable_map_3.insert(key, value);
}

$query;
export function stable_map_3_is_empty(): boolean {
    return stable_map_3.is_empty();
}

$query;
export function stable_map_3_items(): [Reaction, int][] {
    return stable_map_3.items();
}

$query;
export function stable_map_3_keys(): Reaction[] {
    return stable_map_3.keys();
}

$query;
export function stable_map_3_len(): nat64 {
    return stable_map_3.len();
}

$update;
export function stable_map_3_remove(key: Reaction): Opt<int> {
    return stable_map_3.remove(key);
}

$query;
export function stable_map_3_values(): int[] {
    return stable_map_3.values();
}
