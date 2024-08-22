import { IDL, query, update } from 'azle';

let counter: bigint = 0n;

export default class {
    @query([], IDL.Nat)
    get(): bigint {
        return counter;
    }

    @update([IDL.Nat])
    set(n: bigint): void {
        counter = n;
    }

    @update([])
    inc(): void {
        counter += 1n;
    }
}
