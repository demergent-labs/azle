import { IDL, query, update } from 'azle';

export default class {
    counter: bigint = 0n;

    @query([], IDL.Nat)
    get(): bigint {
        return this.counter;
    }

    @update([IDL.Nat])
    set(n: bigint): void {
        this.counter = n;
    }

    @update([])
    inc(): void {
        this.counter += 1n;
    }
}
