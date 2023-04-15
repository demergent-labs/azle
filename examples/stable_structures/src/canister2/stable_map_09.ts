import {
    float64,
    nat64,
    Opt,
    $query,
    StableBTreeMap,
    Tuple,
    $update,
    Vec
} from 'azle';

let stableMap9 = new StableBTreeMap<float64, Vec<string>>(9, 100, 1_000);

$query;
export function stableMap9ContainsKey(key: float64): boolean {
    return stableMap9.containsKey(key);
}

$query;
export function stableMap9Get(key: float64): Opt<Vec<string>> {
    return stableMap9.get(key);
}

$update;
export function stableMap9Insert(
    key: float64,
    value: Vec<string>
): Opt<Vec<string>> {
    return stableMap9.insert(key, value);
}

$query;
export function stableMap9IsEmpty(): boolean {
    return stableMap9.isEmpty();
}

$query;
export function stableMap9Items(): Vec<Tuple<[float64, Vec<string>]>> {
    return stableMap9.items();
}

$query;
export function stableMap9Keys(): Vec<float64> {
    return stableMap9.keys();
}

$query;
export function stableMap9Len(): nat64 {
    return stableMap9.len();
}

$update;
export function stableMap9Remove(key: float64): Opt<Vec<string>> {
    return stableMap9.remove(key);
}

$query;
export function stableMap9Values(): Vec<Vec<string>> {
    return stableMap9.values();
}
