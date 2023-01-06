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
import { User } from './types';

export type StableMap4InsertResult = Variant<{
    ok: Opt<float32>;
    err: InsertError;
}>;

export let stable_map_4 = new StableBTreeMap<User, float32>(4, 100, 1_000);

export function contains_key_stable_map_4(key: User): Query<boolean> {
    return stable_map_4.contains_key(key);
}

export function get_stable_map_4(key: User): Query<Opt<float32>> {
    return stable_map_4.get(key);
}

export function set_stable_map_4(
    key: User,
    value: float32
): Update<StableMap4InsertResult> {
    return stable_map_4.insert(key, value);
}

export function is_empty_stable_map_4(): Query<boolean> {
    return stable_map_4.is_empty();
}

export function len_stable_map_4(): Query<nat64> {
    return stable_map_4.len();
}

export function remove_stable_map_4(key: User): Update<Opt<float32>> {
    return stable_map_4.remove(key);
}
