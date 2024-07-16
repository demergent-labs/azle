import {
    IDL,
    init,
    postUpgrade,
    query,
    StableBTreeMap,
    trap,
    update
} from 'azle';

let stableStorage = StableBTreeMap<string, bigint>(0);
let redeployed = false;

export default class {
    @init([])
    init(): void {
        stableStorage.insert('counter', 0n);
    }

    @postUpgrade([])
    postUpgrade(): void {
        redeployed = true;
    }

    @query([], IDL.Bool)
    getRedeployed(): boolean {
        return redeployed;
    }

    @update([], IDL.Nat)
    increment(): bigint {
        let counter = stableStorage.get('counter');

        if (counter === null) {
            trap('counter not defined');
        }

        counter = counter + 1n;

        stableStorage.insert('counter', counter);

        return counter;
    }

    @query([], IDL.Nat)
    get(): bigint {
        const counter = stableStorage.get('counter');

        if (counter === null) {
            trap('counter not defined');
        }

        return counter;
    }

    @update([], IDL.Nat)
    reset(): bigint {
        stableStorage.insert('counter', 0n);

        const counter = stableStorage.get('counter');

        if (counter === null) {
            trap('counter not defined');
        }

        return counter;
    }
}
