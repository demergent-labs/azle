import { IDL, query, update } from 'azle';

let count: bigint = 0n;

export default class {
    @query([], IDL.Nat64)
    readCount(): bigint {
        return count;
    }

    @update([], IDL.Nat64)
    incrementCount(): bigint {
        count += 1n;

        return count;
    }
}
