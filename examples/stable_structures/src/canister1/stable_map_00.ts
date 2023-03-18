import {
    InsertError,
    nat64,
    nat8,
    Opt,
    $query,
    StableBTreeMap,
    $update,
    Variant
} from 'azle';

type StableMap0InsertResult = Variant<{
    Ok: Opt<string>;
    Err: InsertError;
}>;

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
export function stableMap0Insert(
    key: nat8,
    value: string
): StableMap0InsertResult {
    return stableMap0.insert(key, value);
}

$query;
export function stableMap0IsEmpty(): boolean {
    return stableMap0.isEmpty();
}

$query;
export function stableMap0Items(): [nat8, string][] {
    return stableMap0.items();
}

$query;
export function stableMap0Keys(): nat8[] {
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
export function stableMap0Values(): string[] {
    return stableMap0.values();
}
