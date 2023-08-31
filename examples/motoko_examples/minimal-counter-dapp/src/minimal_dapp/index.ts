import { nat, query, update } from 'azle';

let counter: nat = 0n;

export default class {
    @update([], nat)
    count(): nat {
        counter += 1n;

        return counter;
    }

    @query([], nat)
    getCount(): nat {
        return counter;
    }

    @update([], nat)
    reset(): nat {
        counter = 0n;

        return counter;
    }
}
