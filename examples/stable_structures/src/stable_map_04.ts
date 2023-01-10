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

type StableMap4InsertResult = Variant<{
    ok: Opt<float32>;
    err: InsertError;
}>;

let stable_map_4 = new StableBTreeMap<User, float32>(4, 100, 1_000);

export function stable_map_4_contains_key(key: User): Query<boolean> {
    return stable_map_4.contains_key(key);
}

export function stable_map_4_get(key: User): Query<Opt<float32>> {
    return stable_map_4.get(key);
}

export function stable_map_4_insert(
    key: User,
    value: float32
): Update<StableMap4InsertResult> {
    return stable_map_4.insert(key, value);
}

export function stable_map_4_is_empty(): Query<boolean> {
    return stable_map_4.is_empty();
}

export function stable_map_4_items(): Update<[User, float32][]> {
    return stable_map_4.items();
}

export function stable_map_4_keys(): Update<User[]> {
    return stable_map_4.keys();
}

export function stable_map_4_len(): Query<nat64> {
    return stable_map_4.len();
}

export function stable_map_4_remove(key: User): Update<Opt<float32>> {
    return stable_map_4.remove(key);
}

export function stable_map_4_values(): Update<float32[]> {
    return stable_map_4.values();
}
