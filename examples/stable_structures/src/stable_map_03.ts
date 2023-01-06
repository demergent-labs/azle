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

export function contains_key_stable_map_3(key: Reaction): Query<boolean> {
    return stable_map_3.contains_key(key);
}

export function get_stable_map_3(key: Reaction): Query<Opt<int>> {
    return stable_map_3.get(key);
}

export function set_stable_map_3(
    key: Reaction,
    value: int
): Update<StableMap3InsertResult> {
    return stable_map_3.insert(key, value);
}

export function is_empty_stable_map_3(): Query<boolean> {
    return stable_map_3.is_empty();
}

export function len_stable_map_3(): Query<nat64> {
    return stable_map_3.len();
}

export function remove_stable_map_3(key: Reaction): Update<Opt<int>> {
    return stable_map_3.remove(key);
}
