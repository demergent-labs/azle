import {
    Query,
    Update,
    Nat
} from 'azle';

let counter: Nat = 0;

export function get(): Query<Nat> {
    return counter;
}

// TODO we do not have a void type. See https://github.com/demergent-labs/azle/issues/8
export function set(n: Nat): Update<Nat> {
    counter = n;
    return counter;
}

// TODO we do not have a void type. See https://github.com/demergent-labs/azle/issues/8
export function inc(): Update<Nat> {
    counter += 1;
    return counter;
}
