import { Query, Update, nat } from 'azle';

let counter: nat = 0n;

export function get(): Query<nat> {
    return counter;
}

export function set(n: nat): Update<void> {
    counter = n;
}

export function inc(): Update<void> {
    counter += 1n;
}
