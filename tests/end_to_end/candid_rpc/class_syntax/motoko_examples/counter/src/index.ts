import { IDL, query, update } from 'azle';

let counter: nat = 0n;

export default class {
    @query([], nat)
    get() {
        return counter;
    }
    @update([nat])
    set(n) {
        counter = n;
    }
    @update([])
    inc() {
        counter += 1n;
    }
}
