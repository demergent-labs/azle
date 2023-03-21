import { nat64, $query, $update } from 'azle';

let count: nat64 = 0n;

$query;
export function readCount(): nat64 {
    return count;
}

$update;
export function incrementCount(): nat64 {
    count += 1n;

    return count;
}
