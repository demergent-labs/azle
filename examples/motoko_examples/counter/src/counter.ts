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

// TODO we do not have a void type. See https://github.com/demergent-labs/azle/issues/8
export function set(n: float64): Update<float64> {
    counter = n;
    return counter;
}

// TODO we do not have a void type. See https://github.com/demergent-labs/azle/issues/8
export function inc(): Update<float64> {
    counter += 1;
    return counter;
}
