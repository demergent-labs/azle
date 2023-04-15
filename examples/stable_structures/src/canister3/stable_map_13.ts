import {
    nat64,
    Opt,
    Principal,
    $query,
    StableBTreeMap,
    Tuple,
    $update,
    Vec
} from 'azle';

let stableMap13 = new StableBTreeMap<string, Principal>(13, 100, 1_000);

$query;
export function stableMap13ContainsKey(key: string): boolean {
    return stableMap13.containsKey(key);
}

$query;
export function stableMap13Get(key: string): Opt<Principal> {
    return stableMap13.get(key);
}

$update;
export function stableMap13Insert(
    key: string,
    value: Principal
): Opt<Principal> {
    return stableMap13.insert(key, value);
}

$query;
export function stableMap13IsEmpty(): boolean {
    return stableMap13.isEmpty();
}

$query;
export function stableMap13Items(): Vec<Tuple<[string, Principal]>> {
    return stableMap13.items();
}

$query;
export function stableMap13Keys(): Vec<string> {
    return stableMap13.keys();
}

$query;
export function stableMap13Len(): nat64 {
    return stableMap13.len();
}

$update;
export function stableMap13Remove(key: string): Opt<Principal> {
    return stableMap13.remove(key);
}

$query;
export function stableMap13Values(): Vec<Principal> {
    return stableMap13.values();
}
