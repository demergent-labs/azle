import {
    IDL,
    init,
    postUpgrade,
    query,
    StableBTreeMap,
    trap,
    update
} from 'azle';

export default class {
    stableStorage = StableBTreeMap<string, bigint>(0);
    redeployed = false;

    @init([])
    init(): void {
        this.stableStorage.insert('counter', 0n);
    }

    @postUpgrade([])
    postUpgrade(): void {
        this.redeployed = true;
    }

    @query([], IDL.Bool)
    getRedeployed(): boolean {
        return this.redeployed;
    }

    @update([], IDL.Nat)
    increment(): bigint {
        let counter = this.stableStorage.get('counter');

        if (counter === null) {
            trap('counter not defined');
        }

        const incrementedCounter = counter + 1n;

        this.stableStorage.insert('counter', incrementedCounter);

        return incrementedCounter;
    }

    @query([], IDL.Nat)
    get(): bigint {
        const counter = this.stableStorage.get('counter');

        if (counter === null) {
            trap('counter not defined');
        }

        return counter;
    }

    @update([], IDL.Nat)
    reset(): bigint {
        this.stableStorage.insert('counter', 0n);

        const counter = this.stableStorage.get('counter');

        if (counter === null) {
            trap('counter not defined');
        }

        return counter;
    }
}
