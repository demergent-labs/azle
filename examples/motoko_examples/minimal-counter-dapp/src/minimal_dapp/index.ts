import { Service, nat, query, update } from 'azle';

export default class extends Service {
    counter: nat = 0n;

    @update([], nat)
    count(): nat {
        this.counter += 1n;

        return this.counter;
    }

    @query([], nat)
    getCount(): nat {
        return this.counter;
    }

    @update([], nat)
    reset(): nat {
        this.counter = 0n;

        return this.counter;
    }
}
