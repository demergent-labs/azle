import { Canister, nat64, query, update } from 'azle';

let count: nat64 = 0n;

export default Canister({
    readCount: query([], nat64, () => {
        return count;
    }),
    incrementCount: update([], nat64, () => {
        count += 1n;

        return count;
    })
});
