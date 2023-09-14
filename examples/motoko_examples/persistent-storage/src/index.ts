import {
    ic,
    init,
    nat,
    query,
    Service,
    StableBTreeMap,
    text,
    update
} from 'azle';

export default class extends Service {
    stableStorage = new StableBTreeMap<text, nat>(text, nat, 0);

    @init([])
    init() {
        this.stableStorage.insert('counter', 0n);
    }

    @update([], nat)
    increment(): nat {
        const counterOpt = this.stableStorage.get('counter');
        const counter =
            counterOpt.length === 0
                ? ic.trap('counter not defined')
                : counterOpt[0] + 1n;

        this.stableStorage.insert('counter', counter);

        return counter;
    }

    @query([], nat)
    get(): nat {
        const counterOpt = this.stableStorage.get('counter');
        const counter =
            counterOpt.length === 0
                ? ic.trap('counter not defined')
                : counterOpt[0];

        return counter;
    }

    @update([], nat)
    reset(): nat {
        this.stableStorage.insert('counter', 0n);

        const counterOpt = this.stableStorage.get('counter');
        const counter =
            counterOpt.length === 0
                ? ic.trap('counter not defined')
                : counterOpt[0];

        return counter;
    }
}
