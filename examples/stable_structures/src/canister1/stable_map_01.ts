import {
    blob,
    nat16,
    nat64,
    Opt,
    $query,
    StableBTreeMap,
    Tuple,
    $update,
    Vec
} from 'azle';

let stableMap1 = new StableBTreeMap<nat16, blob>(1, 100, 1_000);

$query;
export function stableMap1ContainsKey(key: nat16): boolean {
    return stableMap1.containsKey(key);
}

$query;
export function stableMap1Get(key: nat16): Opt<blob> {
    return stableMap1.get(key);
}

$update;
export function stableMap1Insert(key: nat16, value: blob): Opt<blob> {
    return stableMap1.insert(key, value);
}

$query;
export function stableMap1IsEmpty(): boolean {
    return stableMap1.isEmpty();
}

$query;
export function stableMap1Items(): Vec<Tuple<[nat16, blob]>> {
    return stableMap1.items();
}

$query;
export function stableMap1Keys(): Vec<nat16> {
    return stableMap1.keys();
}

$query;
export function stableMap1Len(): nat64 {
    return stableMap1.len();
}

$update;
export function stableMap1Remove(key: nat16): Opt<blob> {
    return stableMap1.remove(key);
}

$query;
export function stableMap1Values(): Vec<blob> {
    return stableMap1.values();
}
