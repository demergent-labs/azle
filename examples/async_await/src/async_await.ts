import {
    Alias,
    nat64,
    nat8,
    Opt,
    $query,
    StableBTreeMap,
    $update,
    Vec
} from 'azle';

type Key = Alias<nat8>;
type Value = Alias<string>;

let map = new StableBTreeMap<Key, Value>(0, 100, 1_000);

$query;
export function containsKey(key: Key): boolean {
    return map.containsKey(key);
}

$query;
export function get(key: Key): Opt<Value> {
    return map.get(key);
}

$update;
export function insert(key: Key, value: Value): Opt<Value> {
    return map.insert(key, value);
}

$query;
export function isEmpty(): boolean {
    return map.isEmpty();
}

$query;
export function items(): Vec<[Key, Value]> {
    return map.items();
}

$query;
export function keys(): Vec<Key> {
    return map.keys();
}

$query;
export function len(): nat64 {
    return map.len();
}

$update;
export function remove(key: Key): Opt<Value> {
    return map.remove(key);
}

$query;
export function values(): Vec<Value> {
    return map.values();
}
