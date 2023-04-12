import {
    blob,
    nat64,
    Opt,
    $query,
    StableBTreeMap,
    Tuple,
    $update,
    Vec
} from 'azle';
import { Reaction } from '../types';

let stableMap12 = new StableBTreeMap<blob, Reaction>(12, 100, 1_000);

$query;
export function stableMap12ContainsKey(key: blob): boolean {
    return stableMap12.containsKey(key);
}

$query;
export function stableMap12Get(key: blob): Opt<Reaction> {
    return stableMap12.get(key);
}

$update;
export function stableMap12Insert(key: blob, value: Reaction): Opt<Reaction> {
    return stableMap12.insert(key, value);
}

$query;
export function stableMap12IsEmpty(): boolean {
    return stableMap12.isEmpty();
}

$query;
export function stableMap12Items(): Vec<Tuple<[blob, Reaction]>> {
    return stableMap12.items();
}

$query;
export function stableMap12Keys(): Vec<blob> {
    return stableMap12.keys();
}

$query;
export function stableMap12Len(): nat64 {
    return stableMap12.len();
}

$update;
export function stableMap12Remove(key: blob): Opt<Reaction> {
    return stableMap12.remove(key);
}

$query;
export function stableMap12Values(): Vec<Reaction> {
    return stableMap12.values();
}
