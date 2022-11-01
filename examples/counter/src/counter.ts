import { nat64, Query, Update } from 'azle';

let count: nat64 = 0n;

export function read_count(): Query<nat64> {
    return count;
}

export function increment_count(): Update<nat64> {
    count += 1n;

    return count;
}
