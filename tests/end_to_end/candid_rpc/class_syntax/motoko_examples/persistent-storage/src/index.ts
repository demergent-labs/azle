import { IDL, query, update } from 'azle';

let stableStorage = StableBTreeMap<IDL.Text, nat>(0);
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
    @query([], bool)
    getRedeployed() {
        return redeployed;
    }
    @update([], nat)
    increment() {
        const counterOpt = stableStorage.get('counter');
        const counter =
            'None' in counterOpt
                ? ic.trap('counter not defined')
                : counterOpt.Some + 1n;

        stableStorage.insert('counter', counter);

        return counter;
    }
    @query([], nat)
    get() {
        const counterOpt = stableStorage.get('counter');
        const counter =
            'None' in counterOpt
                ? ic.trap('counter not defined')
                : counterOpt.Some;

        return counter;
    }
    @update([], nat)
    reset() {
        stableStorage.insert('counter', 0n);

        const counterOpt = stableStorage.get('counter');
        const counter =
            'None' in counterOpt
                ? ic.trap('counter not defined')
                : counterOpt.Some;

        return counter;
    }
}
