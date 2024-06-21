import { Canister, nat, query, update, Void } from 'azle/experimental';

let counter: nat = 0n;

export default class {
    @query([], nat)
    get() {
        return counter;
    }
    @update([nat], Void)
    set(n) {
        counter = n;
    }
    @update([], Void)
    inc() {
        counter += 1n;
    }
}
