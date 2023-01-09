import {
    InsertError,
    int,
    nat64,
    Opt,
    Query,
    StableBTreeMap,
    Update,
    Variant
} from 'azle';
import { Reaction } from './types';

export type StableMap3InsertResult = Variant<{
    ok: Opt<int>;
    err: InsertError;
}>;

export let stable_map_3 = new StableBTreeMap<Reaction, int>(3, 100, 1_000);

export function stable_map_3_contains_key(key: Reaction): Query<boolean> {
    return stable_map_3.contains_key(key);
}

export function stable_map_3_get(key: Reaction): Query<Opt<int>> {
    return stable_map_3.get(key);
}

export function stable_map_3_insert(
    key: Reaction,
    value: int
): Update<StableMap3InsertResult> {
    return stable_map_3.insert(key, value);
}

export function stable_map_3_is_empty(): Query<boolean> {
    return stable_map_3.is_empty();
}

export function stable_map_3_len(): Query<nat64> {
    return stable_map_3.len();
}

export function stable_map_3_remove(key: Reaction): Update<Opt<int>> {
    return stable_map_3.remove(key);
}
