import {
    Query,
    Update,
    u64
} from 'azle';

let count: u64 = 0;

export function readCount(): Query<u64> {
    return count;
}

export function incrementCount(): Update<u64> {
    count = count + 1;

    return count;
}