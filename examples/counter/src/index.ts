import { nat64, query, Service, update } from 'azle';

let count: nat64 = 0n;

export default Service({
    readCount: query([], nat64, () => {
        return count;
    }),
    incrementCount: update([], nat64, () => {
        count += 1n;

        return count;
    })
});
