import {
    bool,
    Canister,
    ic,
    init,
    nat,
    postUpgrade,
    query,
    StableBTreeMap,
    text,
    update
} from 'azle';

let stableStorage = StableBTreeMap(text, nat, 0);
let redeployed = false;

export default Canister({
    init: init([], () => {
        stableStorage.insert('counter', 0n);
    }),
    postUpgrade: postUpgrade([], () => {
        redeployed = true;
    }),
    getRedeployed: query([], bool, () => {
        return redeployed;
    }),
    increment: update([], nat, () => {
        const counterOpt = stableStorage.get('counter');
        const counter =
            counterOpt.Some !== undefined
                ? counterOpt.Some + 1n
                : ic.trap('counter not defined');

        stableStorage.insert('counter', counter);

        return counter;
    }),
    get: query([], nat, () => {
        const counterOpt = stableStorage.get('counter');
        const counter =
            counterOpt.Some !== undefined
                ? counterOpt.Some
                : ic.trap('counter not defined');

        return counter;
    }),
    reset: update([], nat, () => {
        stableStorage.insert('counter', 0n);

        const counterOpt = stableStorage.get('counter');
        const counter =
            counterOpt.Some !== undefined
                ? counterOpt.Some
                : ic.trap('counter not defined');

        return counter;
    })
});
