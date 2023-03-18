import {
    InsertError,
    nat64,
    Opt,
    $query,
    StableBTreeMap,
    $update,
    Variant
} from 'azle';

type StableMap6InsertResult = Variant<{
    Ok: Opt<boolean>;
    Err: InsertError;
}>;

let stableMap6 = new StableBTreeMap<nat64[], boolean>(6, 100, 1_000);

$query;
export function stableMap6ContainsKey(key: nat64[]): boolean {
    return stableMap6.containsKey(key);
}

$query;
export function stableMap6Get(key: nat64[]): Opt<boolean> {
    return stableMap6.get(key);
}

$update;
export function stableMap6Insert(
    key: nat64[],
    value: boolean
): StableMap6InsertResult {
    return stableMap6.insert(key, value);
}

$query;
export function stableMap6IsEmpty(): boolean {
    return stableMap6.isEmpty();
}

$query;
export function stableMap6Items(): [nat64[], boolean][] {
    return stableMap6.items();
}

$query;
export function stableMap6Keys(): nat64[][] {
    return stableMap6.keys();
}

$query;
export function stableMap6Len(): nat64 {
    return stableMap6.len();
}

$update;
export function stableMap6Remove(key: nat64[]): Opt<boolean> {
    return stableMap6.remove(key);
}

$query;
export function stableMap6Values(): boolean[] {
    return stableMap6.values();
}
