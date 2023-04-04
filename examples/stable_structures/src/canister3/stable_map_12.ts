import {
    blob,
    InsertError,
    nat64,
    Opt,
    $query,
    Result,
    StableBTreeMap,
    $update
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
export function stableMap12Insert(
    key: blob,
    value: Reaction
): Result<Opt<Reaction>, InsertError> {
    return stableMap12.insert(key, value);
}

$query;
export function stableMap12IsEmpty(): boolean {
    return stableMap12.isEmpty();
}

$query;
export function stableMap12Items(): [blob, Reaction][] {
    return stableMap12.items();
}

$query;
export function stableMap12Keys(): blob[] {
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
export function stableMap12Values(): Reaction[] {
    return stableMap12.values();
}
