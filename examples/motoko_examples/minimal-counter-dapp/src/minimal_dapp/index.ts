import { Canister, nat, query, update } from 'azle';

let counter: nat = 0n;

export default Canister({
    count: update([], nat, () => {
        counter += 1n;

        return counter;
    }),
    getCount: query([], nat, () => {
        return counter;
    }),
    reset: update([], nat, () => {
        counter = 0n;

        return counter;
    })
});
