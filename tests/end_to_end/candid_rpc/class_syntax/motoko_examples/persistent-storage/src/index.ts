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
        const counterOpt = stableStorage.get('counter');
        const counter =
            'None' in counterOpt
                ? trap('counter not defined')
                : counterOpt.Some + 1n;

        stableStorage.insert('counter', counter);

        return counter;
    }

    @query([], IDL.Nat)
    get(): bigint {
        const counterOpt = stableStorage.get('counter');
        const counter =
            'None' in counterOpt
                ? trap('counter not defined')
                : counterOpt.Some;

        return counter;
    }

    @update([], IDL.Nat)
    reset(): bigint {
        stableStorage.insert('counter', 0n);

        const counterOpt = stableStorage.get('counter');
        const counter =
            'None' in counterOpt
                ? trap('counter not defined')
                : counterOpt.Some;

        return counter;
    }
}
