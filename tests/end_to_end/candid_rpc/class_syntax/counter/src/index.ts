import { IDL, query, update } from 'azle';

let count: bigint = 0n;

export default class {
    @query([], IDL.Nat64)
    readCount() {
        return count;
    }
    @update([], IDL.Nat64)
    incrementCount() {
        count += 1n;

        return count;
    }
}
