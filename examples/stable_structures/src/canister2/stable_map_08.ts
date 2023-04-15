import { nat64, Opt, $query, StableBTreeMap, Tuple, $update, Vec } from 'azle';

let stableMap8 = new StableBTreeMap<boolean, null>(8, 100, 1_000);

$query;
export function stableMap8ContainsKey(key: boolean): boolean {
    return stableMap8.containsKey(key);
}

$query;
export function stableMap8Get(key: boolean): Opt<null> {
    return stableMap8.get(key);
}

$update;
export function stableMap8Insert(key: boolean, value: null): Opt<null> {
    return stableMap8.insert(key, value);
}

$query;
export function stableMap8IsEmpty(): boolean {
    return stableMap8.isEmpty();
}

$query;
export function stableMap8Items(): Vec<Tuple<[boolean, null]>> {
    return stableMap8.items();
}

$query;
export function stableMap8Keys(): Vec<boolean> {
    return stableMap8.keys();
}

$query;
export function stableMap8Len(): nat64 {
    return stableMap8.len();
}

$update;
export function stableMap8Remove(key: boolean): Opt<null> {
    return stableMap8.remove(key);
}

$query;
export function stableMap8Values(): Vec<null> {
    return stableMap8.values();
}
