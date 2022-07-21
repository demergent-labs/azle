import { Query, Update, nat } from 'azle';

let counter: nat = 0n;

export function count(): Update<nat> {
    counter += 1n;
    return counter;
}

export function get_count(): Query<nat> {
    return counter;
}

export function reset(): Update<nat> {
    counter = 0n;
    return counter;
}
