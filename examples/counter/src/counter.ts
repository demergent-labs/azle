import {
    Query,
    Update,
    float64
} from 'azle';

// TODO count should be a nat64: https://github.com/demergent-labs/azle/issues/98
let count: float64 = 0;

export function readCount(): Query<float64> {
    return count;
}

export function incrementCount(): Update<float64> {
    count = count + 1;

    return count;
}