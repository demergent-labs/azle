import {
    Query,
    Update,
    nat64
} from 'azle';

let counter: nat64 = 0n;

export function get(): Query<nat64> {
    return counter;
}

export function set(n: nat64): Update<void> {
    counter = n;
}

export function inc(): Update<void> {
    counter += 1n;
}
