import {
    float32,
    nat64,
    Opt,
    $query,
    StableBTreeMap,
    Tuple,
    $update,
    Vec
} from 'azle';
import { User } from '../types';

let stableMap4 = new StableBTreeMap<User, float32>(4, 100, 1_000);

$query;
export function stableMap4ContainsKey(key: User): boolean {
    return stableMap4.containsKey(key);
}

$query;
export function stableMap4Get(key: User): Opt<float32> {
    return stableMap4.get(key);
}

$update;
export function stableMap4Insert(key: User, value: float32): Opt<float32> {
    return stableMap4.insert(key, value);
}

$query;
export function stableMap4IsEmpty(): boolean {
    return stableMap4.isEmpty();
}

$query;
export function stableMap4Items(): Vec<Tuple<[User, float32]>> {
    return stableMap4.items();
}

$query;
export function stableMap4Keys(): Vec<User> {
    return stableMap4.keys();
}

$query;
export function stableMap4Len(): nat64 {
    return stableMap4.len();
}

$update;
export function stableMap4Remove(key: User): Opt<float32> {
    return stableMap4.remove(key);
}

$query;
export function stableMap4Values(): Vec<float32> {
    return stableMap4.values();
}
