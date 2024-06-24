import { IDL, init, postUpgrade, query, trap, update } from 'azle';

let stableStorage = StableBTreeMap<IDL.Text, IDL.Nat>(0);
let redeployed = false;

export default class {
    @init([])
    init() {
        stableStorage.insert('counter', 0n);
    }
    @postUpgrade([])
    postUpgrade() {
        redeployed = true;
    }
    @query([], IDL.Bool)
    getRedeployed() {
        return redeployed;
    }
    @update([], IDL.Nat)
    increment() {
        const counterOpt = stableStorage.get('counter');
        const counter =
            'None' in counterOpt
                ? trap('counter not defined')
                : counterOpt.Some + 1n;

        stableStorage.insert('counter', counter);

        return counter;
    }
    @query([], IDL.Nat)
    get() {
        const counterOpt = stableStorage.get('counter');
        const counter =
            'None' in counterOpt
                ? trap('counter not defined')
                : counterOpt.Some;

        return counter;
    }
    @update([], IDL.Nat)
    reset() {
        stableStorage.insert('counter', 0n);

        const counterOpt = stableStorage.get('counter');
        const counter =
            'None' in counterOpt
                ? trap('counter not defined')
                : counterOpt.Some;

        return counter;
    }
}
