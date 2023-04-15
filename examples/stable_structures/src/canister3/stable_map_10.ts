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

let stableMap10 = new StableBTreeMap<float32, Opt<boolean>>(10, 100, 1_000);

$query;
export function stableMap10ContainsKey(key: float32): boolean {
    return stableMap10.containsKey(key);
}

$query;
export function stableMap10Get(key: float32): Opt<Opt<boolean>> {
    return stableMap10.get(key);
}

$update;
export function stableMap10Insert(
    key: float32,
    value: Opt<boolean>
): Opt<Opt<boolean>> {
    return stableMap10.insert(key, value);
}

$query;
export function stableMap10IsEmpty(): boolean {
    return stableMap10.isEmpty();
}

$query;
export function stableMap10Items(): Vec<Tuple<[float32, Opt<boolean>]>> {
    return stableMap10.items();
}

$query;
export function stableMap10Keys(): Vec<float32> {
    return stableMap10.keys();
}

$query;
export function stableMap10Len(): nat64 {
    return stableMap10.len();
}

$update;
export function stableMap10Remove(key: float32): Opt<Opt<boolean>> {
    return stableMap10.remove(key);
}

$query;
export function stableMap10Values(): Vec<Opt<boolean>> {
    return stableMap10.values();
}
