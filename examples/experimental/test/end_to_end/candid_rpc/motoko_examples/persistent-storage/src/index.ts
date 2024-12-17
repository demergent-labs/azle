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
} from 'azle/experimental';

let stableStorage = StableBTreeMap<text, nat>(0);
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
        const counter = stableStorage.get('counter');
        if (counter === null) {
            return ic.trap('counter not defined');
        }
        const incrementedCounter = counter + 1n;

        stableStorage.insert('counter', incrementedCounter);

        return incrementedCounter;
    }),
    get: query([], nat, () => {
        const counter = stableStorage.get('counter');

        if (counter === null) {
            return ic.trap('counter not defined');
        }

        return counter;
    }),
    reset: update([], nat, () => {
        stableStorage.insert('counter', 0n);

        const counter = stableStorage.get('counter');
        if (counter === null) {
            return ic.trap('counter not defined');
        }

        return counter;
    })
});
