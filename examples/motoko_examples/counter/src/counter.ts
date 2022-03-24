import {
    Query,
    Update,
    int32
} from 'azle';

// TODO counter should be a nat64: https://github.com/demergent-labs/azle/issues/20
let counter: int32 = 0;

export function get(): Query<int32> {
    return counter;
}

export function set(n: int32): Update<void> {
    counter = n;
}

export function inc(): Update<void> {
    counter += 1;
}
