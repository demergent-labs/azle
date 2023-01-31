import { nat64, $query, $update } from 'azle';

let count: nat64 = 0n;

$query;
export function read_count(): nat64 {
    return count;
}

$update;
export function increment_count(): nat64 {
    count += 1n;

    return count;
}
