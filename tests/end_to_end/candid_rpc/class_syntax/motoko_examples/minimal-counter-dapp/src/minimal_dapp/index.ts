import { IDL, query, update } from 'azle';

let counter: nat = 0n;

export default class {
    @update([], nat)
    count() {
        counter += 1n;

        return counter;
    }
    @query([], nat)
    getCount() {
        return counter;
    }
    @update([], nat)
    reset() {
        counter = 0n;

        return counter;
    }
}