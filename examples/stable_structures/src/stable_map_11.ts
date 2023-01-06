import {
    InsertError,
    nat,
    nat64,
    Opt,
    Query,
    StableBTreeMap,
    Update,
    Variant
} from 'azle';
import { User } from './types';

export type StableMap11InsertResult = Variant<{
    ok: Opt<User>;
    err: InsertError;
}>;

export let stable_map_11 = new StableBTreeMap<nat, User>(11, 100, 1_000);

export function contains_key_stable_map_11(key: nat): Query<boolean> {
    return stable_map_11.contains_key(key);
}

export function get_stable_map_11(key: nat): Query<Opt<User>> {
    return stable_map_11.get(key);
}

export function set_stable_map_11(
    key: nat,
    value: User
): Update<StableMap11InsertResult> {
    return stable_map_11.insert(key, value);
}

export function is_empty_stable_map_11(): Query<boolean> {
    return stable_map_11.is_empty();
}

export function len_stable_map_11(): Query<nat64> {
    return stable_map_11.len();
}

export function remove_stable_map_11(key: nat): Update<Opt<User>> {
    return stable_map_11.remove(key);
}
