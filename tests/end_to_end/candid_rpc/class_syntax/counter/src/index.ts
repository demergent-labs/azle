import { IDL, query, update } from 'azle';

export default class {
    count: bigint = 0n;

    @query([], IDL.Nat64)
    readCount(): bigint {
        return this.count;
    }

    @update([], IDL.Nat64)
    incrementCount(): bigint {
        this.count += 1n;

        return this.count;
    }
}
