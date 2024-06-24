import { IDL, query, update } from 'azle';

let counter: bigint = 0n;

export default class {
    @query([], IDL.Nat)
    get() {
        return counter;
    }
    @update([IDL.Nat])
    set(n: bigint) {
        counter = n;
    }
    @update([])
    inc() {
        counter += 1n;
    }
}
