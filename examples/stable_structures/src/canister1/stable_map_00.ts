import {
    nat64,
    nat8,
    Opt,
    $query,
    StableBTreeMap,
    Tuple,
    $update,
    Vec
} from 'azle';

let stableMap0 = new StableBTreeMap<nat8, string>(0, 100, 100);

$query;
export function stableMap0ContainsKey(key: nat8): boolean {
    return stableMap0.containsKey(key);
}

$query;
export function stableMap0Get(key: nat8): Opt<string> {
    return stableMap0.get(key);
}

$update;
export function stableMap0Insert(key: nat8, value: string): Opt<string> {
    return stableMap0.insert(key, value);
}

$query;
export function stableMap0IsEmpty(): boolean {
    return stableMap0.isEmpty();
}

$query;
export function stableMap0Items(): Vec<Tuple<[nat8, string]>> {
    return stableMap0.items();
}

$query;
export function stableMap0Keys(): Vec<nat8> {
    return stableMap0.keys();
}

$query;
export function stableMap0Len(): nat64 {
    return stableMap0.len();
}

$update;
export function stableMap0Remove(key: nat8): Opt<string> {
    return stableMap0.remove(key);
}

$query;
export function stableMap0Values(): Vec<string> {
    return stableMap0.values();
}
