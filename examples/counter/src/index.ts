import { nat64, query, Service, update } from 'azle';

export default class extends Service {
    count: nat64 = 0n;

    @query([], nat64)
    readCount(): nat64 {
        return this.count;
    }

    @update([], nat64)
    incrementCount(): nat64 {
        this.count += 1n;

        return this.count;
    }
}
