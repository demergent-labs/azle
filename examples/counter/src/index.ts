import { nat64, query, update } from 'azle';

let count: nat64 = 0n;

export default class {
    @query([], nat64)
    readCount(): nat64 {
        return count;
    }

    @update([], nat64)
    incrementCount(): nat64 {
        count += 1n;

        return count;
    }
}
