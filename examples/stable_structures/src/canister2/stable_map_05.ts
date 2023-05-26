import {
    float64,
    nat64,
    Opt,
    $query,
    StableBTreeMap,
    $update,
    Tuple,
    Vec
} from 'azle';

let stableMap5 = new StableBTreeMap<Opt<string>, float64>(5, 100, 1_000);

$query;
export function stableMap5ContainsKey(key: Opt<string>): boolean {
    return stableMap5.containsKey(key);
}

$query;
export function stableMap5Get(key: Opt<string>): Opt<float64> {
    return stableMap5.get(key);
}

$update;
export function stableMap5Insert(
    key: Opt<string>,
    value: float64
): Opt<float64> {
    return stableMap5.insert(key, value);
}

$query;
export function stableMap5IsEmpty(): boolean {
    return stableMap5.isEmpty();
}

$query;
export function stableMap5Items(): Vec<Tuple<[Opt<string>, float64]>> {
    return stableMap5.items();
}

$query;
export function stableMap5Keys(): Vec<Opt<string>> {
    return stableMap5.keys();
}

$query;
export function stableMap5Len(): nat64 {
    return stableMap5.len();
}

$update;
export function stableMap5Remove(key: Opt<string>): Opt<float64> {
    return stableMap5.remove(key);
}

$query;
export function stableMap5Values(): Vec<float64> {
    return stableMap5.values();
}
