import { IDL, query, update } from 'azle';

export default class {
    counter: bigint = 0n;

    @update([], IDL.Nat)
    count(): bigint {
        this.counter += 1n;

        return this.counter;
    }

    @query([], IDL.Nat)
    getCount(): bigint {
        return this.counter;
    }

    @update([], IDL.Nat)
    reset(): bigint {
        this.counter = 0n;

        return this.counter;
    }
}
