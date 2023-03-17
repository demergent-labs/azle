import {
    float32,
    InsertError,
    nat64,
    Opt,
    $query,
    StableBTreeMap,
    $update,
    Variant
} from 'azle';
import { User } from '../types';

type StableMap4InsertResult = Variant<{
    ok: Opt<float32>;
    err: InsertError;
}>;

let stable_map_4 = new StableBTreeMap<User, float32>(4, 100, 1_000);

$query;
export function stable_map_4_contains_key(key: User): boolean {
    return stable_map_4.containsKey(key);
}

$query;
export function stable_map_4_get(key: User): Opt<float32> {
    return stable_map_4.get(key);
}

$update;
export function stable_map_4_insert(
    key: User,
    value: float32
): StableMap4InsertResult {
    return stable_map_4.insert(key, value);
}

$query;
export function stable_map_4_is_empty(): boolean {
    return stable_map_4.isEmpty();
}

$query;
export function stable_map_4_items(): [User, float32][] {
    return stable_map_4.items();
}

$query;
export function stable_map_4_keys(): User[] {
    return stable_map_4.keys();
}

$query;
export function stable_map_4_len(): nat64 {
    return stable_map_4.len();
}

$update;
export function stable_map_4_remove(key: User): Opt<float32> {
    return stable_map_4.remove(key);
}

$query;
export function stable_map_4_values(): float32[] {
    return stable_map_4.values();
}
