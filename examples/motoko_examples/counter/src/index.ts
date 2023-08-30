import { query, update } from 'azle';
import { nat, Void } from 'azle/candid';

let counter: bigint = 0n;

export default class {
    @query([], [nat])
    get(): bigint {
        return counter;
    }

    @update([nat], Void)
    set(n: bigint): void {
        counter = n;
    }

    @update([], Void)
    inc(): void {
        counter += 1n;
    }
}
