import {
    InsertError,
    int,
    nat64,
    Opt,
    $query,
    Result,
    StableBTreeMap,
    $update
} from 'azle';
import { Reaction } from '../types';

let stableMap3 = new StableBTreeMap<Reaction, int>(3, 100, 1_000);

$query;
export function stableMap3ContainsKey(key: Reaction): boolean {
    return stableMap3.containsKey(key);
}

$query;
export function stableMap3Get(key: Reaction): Opt<int> {
    return stableMap3.get(key);
}

$update;
export function stableMap3Insert(
    key: Reaction,
    value: int
): Result<Opt<int>, InsertError> {
    return stableMap3.insert(key, value);
}

$query;
export function stableMap3IsEmpty(): boolean {
    return stableMap3.isEmpty();
}

$query;
export function stableMap3Items(): [Reaction, int][] {
    return stableMap3.items();
}

$query;
export function stableMap3Keys(): Reaction[] {
    return stableMap3.keys();
}

$query;
export function stableMap3Len(): nat64 {
    return stableMap3.len();
}

$update;
export function stableMap3Remove(key: Reaction): Opt<int> {
    return stableMap3.remove(key);
}

$query;
export function stableMap3Values(): int[] {
    return stableMap3.values();
}
