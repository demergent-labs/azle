import { Query, Update, nat64 } from 'azle';

let count: nat64 = 0n;

export function readCount(): Query<nat64> {
    return count;
}

export function incrementCount(): Update<nat64> {
    count = count + 1n;

    return count;
}
