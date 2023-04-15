import { nat64, Opt, $query, StableBTreeMap, Tuple, $update, Vec } from 'azle';

let stableMap6 = new StableBTreeMap<Vec<nat64>, boolean>(6, 100, 1_000);

$query;
export function stableMap6ContainsKey(key: Vec<nat64>): boolean {
    return stableMap6.containsKey(key);
}

$query;
export function stableMap6Get(key: Vec<nat64>): Opt<boolean> {
    return stableMap6.get(key);
}

$update;
export function stableMap6Insert(
    key: Vec<nat64>,
    value: boolean
): Opt<boolean> {
    return stableMap6.insert(key, value);
}

$query;
export function stableMap6IsEmpty(): boolean {
    return stableMap6.isEmpty();
}

$query;
export function stableMap6Items(): Vec<Tuple<[Vec<nat64>, boolean]>> {
    return stableMap6.items();
}

$query;
export function stableMap6Keys(): Vec<Vec<nat64>> {
    return stableMap6.keys();
}

$query;
export function stableMap6Len(): nat64 {
    return stableMap6.len();
}

$update;
export function stableMap6Remove(key: Vec<nat64>): Opt<boolean> {
    return stableMap6.remove(key);
}

$query;
export function stableMap6Values(): Vec<boolean> {
    return stableMap6.values();
}
