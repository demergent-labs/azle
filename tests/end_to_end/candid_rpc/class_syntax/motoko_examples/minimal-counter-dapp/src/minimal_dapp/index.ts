import { IDL, query, update } from 'azle';

let counter: bigint = 0n;

export default class {
    @update([], IDL.Nat)
    count() {
        counter += 1n;

        return counter;
    }
    @query([], IDL.Nat)
    getCount() {
        return counter;
    }
    @update([], IDL.Nat)
    reset() {
        counter = 0n;

        return counter;
    }
}
