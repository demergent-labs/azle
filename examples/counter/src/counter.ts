import {
    Query,
    Update,
    int32
} from 'azle';

// TODO count should be a nat64: https://github.com/demergent-labs/azle/issues/20
let count: int32 = 0;

export function readCount(): Query<int32> {
    return count;
}

export function incrementCount(): Update<int32> {
    count = count + 1;

    return count;
}