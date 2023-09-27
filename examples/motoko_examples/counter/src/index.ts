import { Canister, nat, query, update, Void } from 'azle';

let counter: nat = 0n;

export default Canister({
    get: query([], nat, () => {
        return counter;
    }),
    set: update([nat], Void, (n) => {
        counter = n;
    }),
    inc: update([], Void, () => {
        counter += 1n;
    })
});
