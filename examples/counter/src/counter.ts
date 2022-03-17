import {
    Query,
    Update,
    nat64
} from 'azle';

let count: nat64 = 0;

export function readCount(): Query<nat64> {
    return count;
}

export function incrementCount(): Update<nat64> {
    count = count + 1;

    return count;
}