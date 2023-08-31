import { nat, query, update, Void } from 'azle';

let counter: nat = 0n;

export default class {
    @query([], nat)
    get(): nat {
        return counter;
    }

    @update([nat], Void)
    set(n: nat): void {
        counter = n;
    }

    @update([], Void)
    inc(): void {
        counter += 1n;
    }
}
