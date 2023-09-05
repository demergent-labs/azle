import { nat, query, Service, update, Void } from 'azle';

export default class extends Service {
    counter: nat = 0n;

    @query([], nat)
    get(): nat {
        return this.counter;
    }

    @update([nat], Void)
    set(n: nat): void {
        this.counter = n;
    }

    @update([], Void)
    inc(): void {
        this.counter += 1n;
    }
}
