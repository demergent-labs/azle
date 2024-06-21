import { IDL, query, update } from 'azle';

let count: nat64 = 0n;

export default class {
    @query([], nat64)
    readCount() {
        return count;
    }
    @update([], nat64)
    incrementCount() {
        count += 1n;

        return count;
    }
}
