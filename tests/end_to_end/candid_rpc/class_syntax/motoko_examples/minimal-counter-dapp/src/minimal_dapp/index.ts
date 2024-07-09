import { IDL, query, update } from 'azle';

let counter: bigint = 0n;

export default class {
    @update([], IDL.Nat)
    count(): bigint {
        counter += 1n;

        return counter;
    }

    @query([], IDL.Nat)
    getCount(): bigint {
        return counter;
    }

    @update([], IDL.Nat)
    reset(): bigint {
        counter = 0n;

        return counter;
    }
}
