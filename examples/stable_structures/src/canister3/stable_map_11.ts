import {
    InsertError,
    nat,
    nat64,
    Opt,
    $query,
    Result,
    StableBTreeMap,
    $update
} from 'azle';
import { User } from '../types';

let stableMap11 = new StableBTreeMap<nat, User>(11, 100, 1_000);

$query;
export function stableMap11ContainsKey(key: nat): boolean {
    return stableMap11.containsKey(key);
}

$query;
export function stableMap11Get(key: nat): Opt<User> {
    return stableMap11.get(key);
}

$update;
export function stableMap11Insert(
    key: nat,
    value: User
): Result<Opt<User>, InsertError> {
    return stableMap11.insert(key, value);
}

$query;
export function stableMap11IsEmpty(): boolean {
    return stableMap11.isEmpty();
}

$query;
export function stableMap11Items(): [nat, User][] {
    return stableMap11.items();
}

$query;
export function stableMap11Keys(): nat[] {
    return stableMap11.keys();
}

$query;
export function stableMap11Len(): nat64 {
    return stableMap11.len();
}

$update;
export function stableMap11Remove(key: nat): Opt<User> {
    return stableMap11.remove(key);
}

$query;
export function stableMap11Values(): User[] {
    return stableMap11.values();
}
