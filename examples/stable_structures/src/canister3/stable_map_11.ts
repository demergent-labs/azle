import {
    InsertError,
    nat,
    nat64,
    Opt,
    $query,
    StableBTreeMap,
    $update,
    Variant
} from 'azle';
import { User } from '../types';

type StableMap11InsertResult = Variant<{
    ok: Opt<User>;
    err: InsertError;
}>;

let stable_map_11 = new StableBTreeMap<nat, User>(11, 100, 1_000);

$query;
export function stable_map_11_contains_key(key: nat): boolean {
    return stable_map_11.contains_key(key);
}

$query;
export function stable_map_11_get(key: nat): Opt<User> {
    return stable_map_11.get(key);
}

$update;
export function stable_map_11_insert(
    key: nat,
    value: User
): StableMap11InsertResult {
    return stable_map_11.insert(key, value);
}

$query;
export function stable_map_11_is_empty(): boolean {
    return stable_map_11.is_empty();
}

$query;
export function stable_map_11_items(): [nat, User][] {
    return stable_map_11.items();
}

$query;
export function stable_map_11_keys(): nat[] {
    return stable_map_11.keys();
}

$query;
export function stable_map_11_len(): nat64 {
    return stable_map_11.len();
}

$update;
export function stable_map_11_remove(key: nat): Opt<User> {
    return stable_map_11.remove(key);
}

$query;
export function stable_map_11_values(): User[] {
    return stable_map_11.values();
}
