import { nat64, Query, Update } from 'azle';

let count: nat64 = 0n;

export function read_count(): Query<nat64> {
    return count;
}

export function increment_count(): Update<nat64> {
    count += 1n;

    return count;
}

// class API

import { query, update } from 'azle';

export default class {
    count: nat64 = 0n;

    @query
    read_count(): nat64 {
        return this.count;
    }

    @update
    increment_count(): nat64 {
        this.count += 1n;

        return this.count;
    }
}
