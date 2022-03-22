import {
    Query,
    Update,
    float64
} from 'azle';

// TODO counter should be a nat64: https://github.com/demergent-labs/azle/issues/98
let counter: float64 = 0;

export function get(): Query<float64> {
    return counter;
}

export function set(n: float64): Update<void> {
    counter = n;
}

export function inc(): Update<void> {
    counter += 1;
}
