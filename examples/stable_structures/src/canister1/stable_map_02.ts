import {
    nat,
    nat32,
    nat64,
    Opt,
    $query,
    StableBTreeMap,
    Tuple,
    $update,
    Vec
} from 'azle';

let stableMap2 = new StableBTreeMap<nat32, nat>(2, 100, 1_000);

$query;
export function stableMap2ContainsKey(key: nat32): boolean {
    return stableMap2.containsKey(key);
}

$query;
export function stableMap2Get(key: nat32): Opt<nat> {
    return stableMap2.get(key);
}

$update;
export function stableMap2Insert(key: nat32, value: nat): Opt<nat> {
    return stableMap2.insert(key, value);
}

$query;
export function stableMap2IsEmpty(): boolean {
    return stableMap2.isEmpty();
}

$query;
export function stableMap2Items(): Vec<Tuple<[nat32, nat]>> {
    return stableMap2.items();
}

$query;
export function stableMap2Keys(): Vec<nat32> {
    return stableMap2.keys();
}

$query;
export function stableMap2Len(): nat64 {
    return stableMap2.len();
}

$update;
export function stableMap2Remove(key: nat32): Opt<nat> {
    return stableMap2.remove(key);
}

$query;
export function stableMap2Values(): Vec<nat> {
    return stableMap2.values();
}
