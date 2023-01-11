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

type StableMap11InsertResult = Variant<{
    ok: Opt<User>;
    err: InsertError;
}>;

let stable_map_11 = new StableBTreeMap<nat, User>(11, 100, 1_000);

export function stable_map_11_contains_key(key: nat): Query<boolean> {
    return stable_map_11.contains_key(key);
}

export function stable_map_11_get(key: nat): Query<Opt<User>> {
    return stable_map_11.get(key);
}

export function stable_map_11_insert(
    key: nat,
    value: User
): Update<StableMap11InsertResult> {
    return stable_map_11.insert(key, value);
}

export function stable_map_11_is_empty(): Query<boolean> {
    return stable_map_11.is_empty();
}

export function stable_map_11_items(): Query<[nat, User][]> {
    return stable_map_11.items();
}

export function stable_map_11_keys(): Query<nat[]> {
    return stable_map_11.keys();
}

export function stable_map_11_len(): Query<nat64> {
    return stable_map_11.len();
}

export function stable_map_11_remove(key: nat): Update<Opt<User>> {
    return stable_map_11.remove(key);
}

export function stable_map_11_values(): Query<User[]> {
    return stable_map_11.values();
}
